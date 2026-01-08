import {
  type T_JSONSchemaEnum,
  type T_JSONSchemaString,
  type T_JSONSchemaNumber,
  type T_JSONSchemaBoolean,
  type T_JSONSchemaArray,
  type T_JSONSchemaObject,
  type T_JSONSchema,
} from './types'

export function createEnumSchema(
  values: ReadonlyArray<string>,
  options: { description?: string; default?: string } = {}
): T_JSONSchemaEnum {
  return { enum: [...values], ...options }
}

export function createStringSchema(
  options: {
    minLength?: number
    maxLength?: number
    format?: 'date' | 'uri' | 'email'
    description?: string
    default?: string
  } = {}
): T_JSONSchemaString {
  return { type: 'string', ...options }
}

export function createNumberSchema(
  options: {
    minimum?: number
    maximum?: number
    description?: string
    default?: number
  } = {}
): T_JSONSchemaNumber {
  return { type: 'number', ...options }
}

export function createBooleanSchema(
  options: { description?: string; default?: boolean } = {}
): T_JSONSchemaBoolean {
  return { type: 'boolean', ...options }
}

export function createArraySchema<T>(
  items: T_JSONSchema,
  options: { description?: string; default?: Array<T> } = {}
): T_JSONSchemaArray<T> {
  return { type: 'array', items, ...options }
}

export function createObjectSchema<T extends Record<string, any>>(
  properties: { [K in keyof T]: T_JSONSchema },
  options: {
    required?: Array<keyof T>
    description?: string
    default?: T
  } = {}
): T_JSONSchemaObject<T> {
  return { type: 'object', properties, ...options }
}
