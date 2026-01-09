import type { CSSProperties } from 'react'

import { assignStyle } from 'css-in-js-utils'

type T_VariableStyle = {
  [key: `--${string}`]: any
}

export type T_RawStyle = CSSProperties & T_VariableStyle

type SelectorKey =
  | `:${string}`
  | `@${string}`
  | `&${string}`
  | `${string} ${string}`
  | `${string}>${string}`
  | `${string}+${string}`
  | `${string}~${string}`
  | `[${string}]${string}`

export type T_Style = T_RawStyle & {
  [K in SelectorKey]?: T_Style
}

export type T_Props = {
  style: CSSProperties
} & Record<string, any>

export type T_Context = {
  devMode: boolean
  createNode: (css: string) => void
  props: T_Props
  mergeStyle: typeof assignStyle
}
