import getNode from './getNode.js'
import insertNode from './insertNode.js'
import removeNode from './removeNode.js'
import { type BaseNode } from './types.js'

export default function moveNode<T extends BaseNode<T>>(
  rootNode: T,
  id: string,
  parentId: string,
  index?: number
): T {
  const node = getNode(rootNode, id)
  const parentNode = getNode(rootNode, parentId)

  if (!node || !parentNode || !parentNode.children) {
    return rootNode
  }

  const removedNode = removeNode(rootNode, id)
  return insertNode(
    removedNode,
    parentId,
    index ?? parentNode.children.length,
    node
  )
}
