import get from './get.js'
import insert from './insert.js'
import { type BaseNode } from './types.js'

export default function add<T extends BaseNode<T>>(
  rootNode: T,
  id: string,
  newNode: T
): T {
  const parentNode = get(rootNode, id)

  if (!parentNode || !parentNode.children) {
    return rootNode
  }

  return insert(rootNode, id, parentNode.children.length, newNode)
}
