import {
  CreateStylesDebugger as createStylesDebugger,
  Config,
} from 'styles-debugger'
import { type T_Style } from '../types'

export default function debugPlugin<T = T_Style>(
  autoActive = true,
  config: Config = {}
) {
  const debugStyle = createStylesDebugger(config)

  return function debug(style: T & { debug?: boolean }) {
    if (autoActive || style?.debug) {
      const { debug, ...rest } = style

      return {
        ...rest,
        ...debugStyle(),
      }
    }

    return style
  }
}
