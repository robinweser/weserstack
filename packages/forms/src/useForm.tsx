import {
  useRef,
  useState,
  FormEvent,
  ChangeEvent,
  useContext,
  PropsWithChildren,
} from 'react'
import { z, ZodObject, ZodError, ZodRawShape, ZodType } from 'zod'
import { $ZodIssue } from 'zod/v4/core'
import { createContext } from '@weser/context'

import { Options } from './types.js'
import defaultFormatErrorMessage from './defaultFormatErrorMessage.js'
import useField from './useField.js'

export function createForm<T extends ZodRawShape>(schema: ZodObject<T>) {
  function _useForm() {
    return useForm<T>(schema)
  }

  const [useFormContext, FormProvider] =
    createContext<ReturnType<typeof useForm<T>>>(null)

  return {
    useForm: _useForm,
    useFormContext,
    FormProvider,
  }
}

export type FieldName<T extends ZodObject<any>> = keyof T['shape']

type FieldsMap = Record<string, ReturnType<typeof useField<any, any>>>

function mapFieldsToData(fields: Record<string, any>): Record<string, any> {
  const obj: Record<string, any> = {}

  for (const name in fields) {
    obj[name] = fields[name].value
  }

  return obj
}

export default function useForm<S extends ZodRawShape>(
  schema: ZodObject<S>,
  formatErrorMessage: (
    error: $ZodIssue,
    value: any,
    name?: string
  ) => string = defaultFormatErrorMessage
) {
  const [isValidating, setIsValidating] = useState(false)
  const fields = useRef<FieldsMap>({})

  function useFormField<T = string, C = ChangeEvent<HTMLInputElement>>(
    _name: keyof S,
    options: Omit<
      Options<T, C>,
      'formatErrorMessage' | 'name' | '_onUpdateValue'
    > = {}
  ) {
    const name = String(_name)
    const shape = schema.shape[_name] as unknown as ZodType<any, any>
    const stored = fields.current[name]

    const field = useField<T, C>(shape, {
      ...options,
      name,
      formatErrorMessage,
      // internals
      _storedField: stored,
      _onInit: (data: any) => {
        fields.current[name] = {
          ...field,
          ...data,
        }
      },
      _onUpdate: (data: any) => {
        fields.current[name] = {
          ...fields.current[name],
          ...data,
        }
      },
    })

    return field
  }

  function touchFields() {
    for (const name in fields.current) {
      fields.current[name].update({
        touched: true,
        // force revalidate
        value: fields.current[name].value,
      })
    }
  }

  function reset() {
    for (const name in fields.current) {
      fields.current[name].reset()
    }
  }

  function checkDirty() {
    for (const name in fields.current) {
      if (fields.current[name].dirty) {
        return true
      }
    }

    return false
  }

  function handleSubmit(
    onSubmit: (data: z.infer<typeof schema>) => void,
    onError?: (error: ZodError) => void
  ) {
    return async (e: FormEvent<HTMLFormElement>) => {
      e.stopPropagation()
      e.preventDefault()

      touchFields()

      // TODO: abort if fields are invalid already
      // collect validation for each field
      const data = mapFieldsToData(fields.current)
      setIsValidating(true)
      const parsed = await schema.safeParseAsync(data)
      setIsValidating(false)

      if (parsed.success) {
        onSubmit(parsed.data)
      } else {
        if (parsed.error.issues.length > 0) {
          _applyErrors(parsed.error.issues)
        }

        if (onError) {
          onError(parsed.error)
        }
      }
    }
  }

  function _applyErrors(issues: Array<$ZodIssue>) {
    for (const issue of issues) {
      const field = fields.current[issue.path[0] as string]

      if (field) {
        field._applyError(issue)
      }
    }
  }

  return {
    useFormField,
    handleSubmit,
    checkDirty,
    isValidating,
    reset,
  }
}
