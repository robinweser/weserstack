import { arrayMap, arrayFilter } from '@weser/loops'

import { type BaseNode } from './types.js'

export default function removeNode<T extends BaseNode<T>>(
  rootNode: T,
  id: string
): T {
  return removeNodeById(rootNode, id)
}

function removeNodeById<T extends BaseNode<T>>(rootNode: T, id: string): T {
  if (!rootNode.children || rootNode.children.length === 0) {
    return rootNode
  }

  const children = arrayMap(
    arrayFilter(rootNode.children, (node) => node.id !== id),
    (node) => removeNodeById(node, id)
  )

  return {
    ...rootNode,
    children,
  }
}
