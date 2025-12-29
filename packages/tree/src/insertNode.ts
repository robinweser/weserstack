import getNode from './getNode.js'
import replaceNode from './replaceNode.js'
import { type BaseNode } from './types.js'

export default function insertNode<T extends BaseNode<T>>(
  rootNode: T,
  id: string,
  index: number,
  newNode: T
): T {
  const parentNode = getNode(rootNode, id)

  if (!parentNode || !parentNode.children) {
    return rootNode
  }

  const children = [
    ...parentNode.children.slice(0, index),
    newNode,
    ...parentNode.children.slice(index),
  ]

  return replaceNode(rootNode, id, {
    ...parentNode,
    children,
  })
}
