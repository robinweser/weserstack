export {
  default as createRenderer,
  type Properties,
  type CSSFunction,
} from './core/createRenderer'
export { default as fallbackValue } from './core/fallbackValue'
export { default as extend } from './core/extend'

export {
  default as responsiveValuePlugin,
  responsiveValue,
  type T_ResponsiveStyle,
  type T_ResponsiveValue,
} from './plugins/responsiveValue'
export {
  default as prefixerPlugin,
  fallbacks as prefixerFallbacks,
} from './plugins/prefixer'
export { default as debugPlugin } from './plugins/debug'
export { default as enforceLonghandPlugin } from './plugins/enforceLonghand'
export { default as sortPropertyPlugin } from './plugins/sortProperty'
export { default as unitPlugin } from './plugins/unit'

export { default as useCSSVariable } from './helpers/useCSSVariable'

export { type T_Fallback, type T_Style } from './types'
