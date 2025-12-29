import getNode from './getNode'
import { BaseNode } from './types'

export default function cloneNode<T extends BaseNode<T>>(
  rootNode: T,
  id: string
): T | null {
  const node = getNode(rootNode, id)

  if (!node) {
    return null
  }

  return cloneNodeById(node)
}

function cloneNodeById<T extends BaseNode<T>>(node: T): T | null {
  if (!node.children || node.children.length === 0) {
    return {
      ...node,
      id: crypto.randomUUID(),
    }
  }

  const newChildren = node.children.map(cloneNodeById)

  return {
    ...node,
    id: crypto.randomUUID(),
    children: newChildren,
  }
}
