import { each } from '@weser/object'
import { hyphenateProperty } from 'css-in-js-utils'
import isPlainObject from 'isobject'

import { T_Context, T_Style } from '../types'

export type T_Fallback = {
  property: Array<keyof T_Style>
  fallback: (value: string) => Array<string> | undefined
}

export default function fallbackValuePlugin(fallbacks: Array<T_Fallback> = []) {
  return function fallbackValue(style: T_Style, context: T_Context) {
    return resolveFallbackValue(style, fallbacks, context)
  }
}

function resolveFallbackValue(
  style: T_Style,
  fallbacks: Array<T_Fallback>,
  context: T_Context
) {
  each(style, (value, property) => {
    if (isPlainObject(value)) {
      style[property] = resolveFallbackValue(value, fallbacks, context)
    } else {
      const fallback = fallbacks.find(
        (fallback) =>
          fallback.property.includes(property) && fallback.fallback(value)
      )

      if (fallback) {
        const values = fallback.fallback(value) ?? []
        const css = getFallbackCSS(property, values, value)
        const variable = getFallbackVariable(property, value)
        context.createNode(css)
        style[property] = `var(${variable})`
      }
    }
  })

  return style
}

function getFallbackCSS(
  property: string,
  values: Array<string>,
  value: string
) {
  const rootCSS = `:root {${getFallbackVariable(property, value)}:;}`

  const supportsCSS = values.map(
    (item) =>
      `@supports (${hyphenateProperty(property)}:${item}){:root{${getFallbackVariable(property, value)}:${item}}}`
  )

  return rootCSS + supportsCSS.join('')
}

function getFallbackVariable(property: string, value: string) {
  return '--' + property + '-' + value
}
