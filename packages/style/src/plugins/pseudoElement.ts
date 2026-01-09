import { each } from '@weser/object'
import { cssifyObject } from 'css-in-js-utils'

import { T_Context, T_Style } from '../types'
import isPlainObject from 'isobject'
import hash from '../helpers/hash'

export default function pseudoElementPlugin() {
  return function pseudoElement(style: T_Style, context: T_Context) {
    return resolvePseudoElement(style, context)
  }

  function resolvePseudoElement(style: T_Style, context: T_Context) {
    each(style, (value, property) => {
      if (isPlainObject(value)) {
        if (property.startsWith('::')) {
          const css = cssifyObject(value)

          const id = hash(css)
          context.createNode(`[data-style-id="${id}"]${property} {${css}}`)
          context.props['data-style-id'] = id

          delete style[property]
        } else {
          style[property] = resolvePseudoElement(value, context)
        }
      }
    })

    return style
  }
}
