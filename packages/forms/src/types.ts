import { $ZodIssue } from 'zod/v4/core'

export type Field<T> = {
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
  _onInit?: (field: Field<T>) => void
  _onUpdate?: (field: Partial<Field<T>>) => void
  _storedField?: Field<T>
}
