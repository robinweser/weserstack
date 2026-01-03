import get from './get.js'
import { type BaseNode } from './types.js'

export default function clone<T extends BaseNode<T>>(
  rootNode: T,
  id: string
): T | null {
  const node = get(rootNode, id)

  if (!node) {
    return null
  }

  return cloneById(node)
}

function cloneById<T extends BaseNode<T>>(node: T): T | null {
  if (!node.children || node.children.length === 0) {
    return {
      ...node,
      id: crypto.randomUUID(),
    }
  }

  const newChildren = node.children.map(cloneById)

  return {
    ...node,
    id: crypto.randomUUID(),
    children: newChildren,
  }
}
