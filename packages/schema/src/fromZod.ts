import z, { ZodType } from 'zod'

import { type T_JSONSchema } from './types'

export default function fromZod(schema: ZodType) {
  return z.toJSONSchema(schema) as T_JSONSchema
}
