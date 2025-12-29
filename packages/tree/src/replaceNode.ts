import getNode from './getNode.js'
import { type BaseNode } from './types.js'

export default function replaceNode<T extends BaseNode<T>>(
  rootNode: T,
  id: string,
  newNode: T
): T {
  const node = getNode(rootNode, id)

  if (!node) {
    return rootNode
  }

  return replaceNodeById(rootNode, id, newNode)
}

function replaceNodeById<T extends BaseNode<T>>(
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
    replaceNodeById(node, id, newNode)
  )

  return {
    ...rootNode,
    children,
  }
}
