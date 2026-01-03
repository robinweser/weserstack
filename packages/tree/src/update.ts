import get from './get.js'
import replace from './replace.js'
import { type BaseNode, type BaseNodeInput } from './types.js'

export default function update<T extends BaseNode<T>>(
  rootNode: T,
  id: string,
  newNode: Partial<BaseNodeInput<T>>
): T {
  const node = get(rootNode, id)

  if (!node) {
    return rootNode
  }

  return replace(rootNode, id, {
    ...node,
    ...newNode,
  })
}
