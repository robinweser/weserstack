import getValueFromCache from './getValueFromCache'
import createStyleNode from './createStyleNode'
import getAnimationName from './getAnimationName'

import { type T_Keyframe } from './types'

type Node = ReturnType<typeof createStyleNode>

export default function createKeyframe(
  style: T_Keyframe,
  nonce?: string
): [string, Node] {
  const animationName = getAnimationName(style)
  const css = getValueFromCache(animationName, style)
  const node = createStyleNode(animationName, css, nonce)

  return [animationName, node]
}
