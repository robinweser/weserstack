import { each } from '@weser/object'
import isPlainObject from 'isobject'

import { T_Context, T_Style } from '../types'

export type T_CustomStyle<T extends Record<string, (value: any) => T_Style>> =
  Partial<Record<keyof T, Parameters<T[keyof T]>[0]>>

export default function customPropertyPlugin<
  T extends Record<string, (value: any) => T_Style>,
>(properties: T) {
  return function customProperty<T extends Record<string, any> = T_Style>(
    style: T,
    context: T_Context
  ) {
    return resolveCustomProperty(style, properties, context)
  }
}

function resolveCustomProperty<
  T extends Record<string, (value: any) => T_Style>,
>(style: T_Style, properties: T, context: T_Context) {
  each(style, (value, property) => {
    if (properties.hasOwnProperty(property)) {
      const resolved = properties[property as keyof T](value)
      context.mergeStyle(style, resolved)

      if (!resolved.hasOwnProperty(property)) {
        delete style[property]
      }
    }

    if (style.hasOwnProperty(property) && isPlainObject(value)) {
      style[property] = resolveCustomProperty(value, properties, context)
    }
  })

  return style
}
