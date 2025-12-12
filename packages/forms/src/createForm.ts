import { ZodObject, ZodRawShape } from 'zod'
import type { ChangeEvent } from 'react'
import { createContext } from '@weser/context'

import useForm from './useForm.js'
import useField from './useField.js'
import type { T_FieldName } from './types.js'

export function createForm<T extends ZodRawShape>(schema: ZodObject<T>) {
  function _useForm() {
    return useForm<T>(schema)
  }

  const [useFormContext, FormProvider] =
    createContext<ReturnType<typeof _useForm>>(null)

  type FieldName = T_FieldName<typeof schema>
  // TODO: clean up the types
  type FieldProps<T = string, C = ChangeEvent<HTMLInputElement>> = {
    name: FieldName
    children: (field: ReturnType<typeof useField<T, C>>) => React.ReactNode
  } & Parameters<typeof useField<T, C>>[1]
  function Field<T = string, C = ChangeEvent<HTMLInputElement>>({
    name,
    children,
    ...options
  }: FieldProps<T, C>) {
    const { useFormField } = useFormContext()
    const field = useFormField(name, options)

    return children(field)
  }

  return {
    useForm: _useForm,
    useFormContext,
    FormProvider,
    Field,
  }
}
