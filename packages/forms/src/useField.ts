import { ChangeEvent, useEffect, useState } from 'react'
import { ZodType } from 'zod'
import { $ZodIssue } from 'zod/v4/core'

import { T_Field, Options } from './types.js'
import defaultFormatErrorMessage from './defaultFormatErrorMessage.js'

const defaultParseEvent = <T, C>(e: C) =>
  (e as ChangeEvent<HTMLInputElement>).target.value as T
const defaultFormatValue = <T>(value: T) => value

export default function useField<T = string, C = ChangeEvent<HTMLInputElement>>(
  schema: ZodType,
  {
    name,
    value = '' as T,
    disabled = false,
    touched = false,
    showValidationOn = 'submit',
    parseEvent = defaultParseEvent<T, C>,
    formatValue = defaultFormatValue<T>,
    formatErrorMessage = defaultFormatErrorMessage,
    _onInit,
    _onUpdate,
    _storedField,
  }: Options<T, C> = {}
) {
  function _validate(value: T): undefined | string {
    const { success, error } = schema.safeParse(value)

    if (!success && error.issues.length > 0) {
      return formatErrorMessage(error.issues[0], value, name)
    }
  }

  const message = _validate(value)

  const initialField = {
    value,
    disabled,
    touched,
    dirty: false,
    valid: !message,
    errorMessage: message,
  }

  const [field, setField] = useState<T_Field<T>>(_storedField ?? initialField)

  useEffect(() => {
    if (_onInit && !_storedField) {
      _onInit(field)
    }
  }, [_onInit, _storedField])

  function update(data: Partial<T_Field<T>>) {
    if (data.value !== undefined) {
      const dirty = data.value !== initialField.value
      const errorMessage = _validate(data.value)

      const _data = {
        touched: showValidationOn === 'change' ? dirty : field.touched,
        dirty,
        ...data,
        errorMessage,
        valid: !errorMessage,
      }

      if (_onUpdate) {
        _onUpdate(_data)
      }

      setField((field: T_Field<T>) => ({
        ...field,
        ..._data,
      }))
    } else {
      if (_onUpdate) {
        _onUpdate(data)
      }

      setField((field: T_Field<T>) => ({
        ...field,
        ...data,
      }))
    }
  }

  function reset() {
    if (_onUpdate) {
      _onUpdate(initialField)
    }

    setField(initialField)
  }

  function validate() {
    return schema.safeParse(field.value)
  }

  function onChange(e: C) {
    update({ value: parseEvent(e) })
  }

  // Only show validation error when is touched
  const valid = !field.touched ? true : !field.errorMessage
  // Only show errrorMessage and validation styles if the field is touched according to the config
  const errorMessage = field.touched ? field.errorMessage : undefined

  const touch = () => update({ touched: true })
  const untouch = () => update({ touched: false })

  function getListeners() {
    if (showValidationOn === 'blur') {
      return {
        onFocus: untouch,
        onBlur: touch,
      }
    }

    return {
      onFocus: untouch,
    }
  }

  function _applyError(issue: $ZodIssue) {
    const errorMessage = formatErrorMessage(issue, field.value, name)

    setField((field: T_Field<T>) => ({
      ...field,
      errorMessage,
    }))
  }

  const inputValue = formatValue(field.value)
  const inputProps = {
    value: inputValue,
    disabled: field.disabled,
    name,
    'data-valid': valid,
    onChange,
    ...getListeners(),
  }

  const props = {
    value: inputValue,
    disabled: field.disabled,
    name,
    valid,
    errorMessage,
    onChange,
    ...getListeners(),
  }

  return {
    ...field,
    valid,
    update,
    reset,
    validate,
    errorMessage,
    inputProps,
    props,
    _initial: initialField,
    _applyError,
  }
}
