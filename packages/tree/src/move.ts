import get from './get'
import insert from './insert'
import remove from './remove'
import { type BaseNode } from './types'

export default function move<T extends BaseNode<T>>(
  rootNode: T,
  id: string,
  parentId: string,
  index?: number
): T {
  const node = get(rootNode, id)
  const parentNode = get(rootNode, parentId)

  if (!node || !parentNode || !parentNode.children) {
    return rootNode
  }

  const removedNode = remove(rootNode, id)
  return insert(
    removedNode,
    parentId,
    index ?? parentNode.children.length,
    node
  )
}
