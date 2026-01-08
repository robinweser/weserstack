import get from './get'
import { type BaseNode } from './types'

export default function replace<T extends BaseNode<T>>(
  rootNode: T,
  id: string,
  newNode: T
): T {
  const node = get(rootNode, id)

  if (!node) {
    return rootNode
  }

  return replaceById(rootNode, id, newNode)
}

function replaceById<T extends BaseNode<T>>(
  rootNode: T,
  id: string,
  newNode: T
): T {
  if (rootNode.id === id) {
    return newNode
  }

  if (!rootNode.children || rootNode.children.length === 0) {
    return rootNode
  }

  const children = rootNode.children.map((node) =>
    replaceById(node, id, newNode)
  )

  return {
    ...rootNode,
    children,
  }
}
