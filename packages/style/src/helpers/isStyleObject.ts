import isObject from 'isobject'

import type { T_Style } from '../types'

/** isobject v4 narrows to Record<string, unknown>, which is not assignable to T_Style */
export default function isStyleObject(value: unknown): value is T_Style {
  return isObject(value as object)
}
