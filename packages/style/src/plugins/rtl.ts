import transformStyle from 'rtl-css-js'

import { T_Style } from '../types'

export default function rtlPlugin<T extends T_Style>(defaultDirection = 'rtl') {
  return function rtl(style: T) {
    const direction = defaultDirection

    if (direction === 'rtl') {
      return transformStyle(style)
    }

    return style
  }
}
