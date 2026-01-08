import {
  type T_JSONSchema,
  type T_JSONSchemaBoolean,
  type T_JSONSchemaEnum,
  type T_JSONSchemaNumber,
  type T_JSONSchemaObject,
  type T_JSONSchemaArray,
  type T_JSONSchemaString,
} from './types'

export function isEnumSchema(schema: T_JSONSchema): schema is T_JSONSchemaEnum {
  return (schema as T_JSONSchemaEnum).enum !== undefined
}

export function isStringSchema(
  schema: T_JSONSchema
): schema is T_JSONSchemaString {
  return (schema as T_JSONSchemaString).type === 'string'
}

export function isNumberSchema(
  schema: T_JSONSchema
): schema is T_JSONSchemaNumber {
  return (schema as T_JSONSchemaNumber).type === 'number'
}

export function isBooleanSchema(
  schema: T_JSONSchema
): schema is T_JSONSchemaBoolean {
  return (schema as T_JSONSchemaBoolean).type === 'boolean'
}

export function isObjectSchema(
  schema: T_JSONSchema
): schema is T_JSONSchemaObject {
  return (schema as T_JSONSchemaObject).type === 'object'
}

export function isArraySchema(
  schema: T_JSONSchema
): schema is T_JSONSchemaArray {
  return (schema as T_JSONSchemaArray).type === 'array'
}
