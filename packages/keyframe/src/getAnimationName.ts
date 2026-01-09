import hash from './hash'

import { type T_Keyframe } from './types'

export default function getAnimationName(style: T_Keyframe) {
  return '_' + hash(JSON.stringify(style))
}
