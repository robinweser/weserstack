import getNode from './getNode.js'
import replaceNode from './replaceNode.js'
import { type BaseNode, type BaseNodeInput } from './types.js'

export default function updateNode<T extends BaseNode<T>>(
  rootNode: T,
  id: string,
  newNode: Partial<BaseNodeInput<T>>
): T {
  const node = getNode(rootNode, id)

  if (!node) {
    return rootNode
  }

  return replaceNode(rootNode, id, {
    ...node,
    ...newNode,
  })
}
