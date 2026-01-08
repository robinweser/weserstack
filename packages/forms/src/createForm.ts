import { ZodObject, ZodRawShape } from 'zod'
import type { ChangeEvent, ReactNode } from 'react'
import { createContext } from '@weser/context'

import _useForm from './useForm'
import useField from './useField'
import type { T_FieldName } from './types'

export default function createForm<T extends ZodRawShape>(
  schema: ZodObject<T>
) {
  function useForm() {
    return _useForm<T>(schema)
  }

  const [useFormContext, FormProvider] =
    createContext<ReturnType<typeof useForm>>(null)

  type FieldName = T_FieldName<typeof schema>
  // TODO: clean up the types
  type FieldProps<T = string, C = ChangeEvent<HTMLInputElement>> = {
    name: FieldName
    children: (field: ReturnType<typeof useField<T, C>>) => ReactNode
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
    useForm,
    useFormContext,
    FormProvider,
    Field,
  }
}
