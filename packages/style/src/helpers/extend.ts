import { T_Style } from '../types'

export default function extend<T = T_Style>(
  condition: boolean,
  style: T
): T_Style {
  return (condition ? style : {}) as T_Style
}
