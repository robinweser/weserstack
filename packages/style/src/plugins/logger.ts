import { T_Style } from '../types'

type Config = {
  prefix?: string
  stringify?: boolean
  clone?: boolean
}
export default function logger(config: Config = {}) {
  const { prefix, stringify = false, clone = true } = config

  return function logger(style: T_Style) {
    const cloned = clone ? { ...style } : style
    const value = stringify ? JSON.stringify(cloned) : cloned

    if (prefix) {
      console.log(prefix, value)
    } else {
      console.log(value)
    }

    return style
  }
}
