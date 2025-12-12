import { ZodObject } from 'zod'
import { $ZodIssue } from 'zod/v4/core'

export type T_FieldName<T extends ZodObject<any>> = keyof T['shape']

export type T_Field<T> = {
  value: T
  disabled: boolean
  touched: boolean
  dirty: boolean
  valid: boolean
  errorMessage?: string
}

export type Options<T, C> = {
  name?: string
  value?: T
  disabled?: boolean
  touched?: boolean
  showValidationOn?: 'submit' | 'blur' | 'change'
  parseEvent?: (e: C) => T
  formatValue?: (value: T) => any
  formatErrorMessage?: (error: $ZodIssue, value: T, name?: string) => string
  _onInit?: (field: T_Field<T>) => void
  _onUpdate?: (field: Partial<T_Field<T>>) => void
  _storedField?: T_Field<T>
}
