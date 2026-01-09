import {
  CreateStylesDebugger as createStylesDebugger,
  type Config,
} from 'styles-debugger'

import { T_Style } from '../types'

export type T_DebugStyle = {
  debug?: boolean
}

export default function debugPlugin<T = T_Style>(
  autoActive = true,
  config: Config = {}
) {
  const debugStyle = createStylesDebugger(config)

  return function debug(style: T & T_DebugStyle) {
    if (autoActive || style?.debug) {
      const { debug: _, ...rest } = style

      return {
        ...rest,
        ...debugStyle(),
      }
    }

    return style
  }
}
