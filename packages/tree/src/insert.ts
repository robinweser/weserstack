import get from './get'
import replace from './replace'
import { type BaseNode } from './types'

export default function insert<T extends BaseNode<T>>(
  rootNode: T,
  id: string,
  index: number,
  newNode: T
): T {
  const parentNode = get(rootNode, id)

  if (!parentNode || !parentNode.children) {
    return rootNode
  }

  const children = [
    ...parentNode.children.slice(0, index),
    newNode,
    ...parentNode.children.slice(index),
  ]

  return replace(rootNode, id, {
    ...parentNode,
    children,
  })
}
