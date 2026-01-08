import get from './get'
import replace from './replace'
import { type BaseNode, type BaseNodeInput } from './types'

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
