import getNode from './getNode.js'
import insertNode from './insertNode.js'
import { type BaseNode } from './types.js'

export default function addNode<T extends BaseNode<T>>(
  rootNode: T,
  id: string,
  newNode: T
): T {
  const parentNode = getNode(rootNode, id)

  if (!parentNode || !parentNode.children) {
    return rootNode
  }

  return insertNode(rootNode, id, parentNode.children.length, newNode)
}
