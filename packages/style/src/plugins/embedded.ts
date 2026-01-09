import { createKeyframe, type T_Keyframe } from '@weser/keyframes'
import { objectEach } from '@weser/loops'

import { T_Context, T_Style } from '../types'

export type T_EmbeddedStyle = Omit<T_Style, 'animationName'> & {
  animationName?: T_Style['animationName'] | T_Keyframe
}

export default function embeddedPlugin<
  T extends Record<string, any> = T_Style,
>() {
  return function embedded(style: T, context: T_Context) {
    return resolveEmbedded<T>(style, context)
  }
}

function resolveEmbedded<T extends Record<string, any> = T_Style>(
  style: T,
  context: T_Context
) {
  objectEach(style, (value, property) => {
    if (typeof value === 'object' && value !== null) {
      if (property === 'animationName') {
        const [keyframe, node] = createKeyframe(value)
        context.createNode(node.props.dangerouslySetInnerHTML.__html)
        style[property] = keyframe as any
      } else {
        style[property] = resolveEmbedded(value, context)
      }
    }
  })

  return style
}
