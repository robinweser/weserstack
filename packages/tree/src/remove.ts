import { map, filter } from '@weser/array'

import { type BaseNode } from './types.js'

export default function remove<T extends BaseNode<T>>(
  rootNode: T,
  id: string
): T {
  return removeById(rootNode, id)
}

function removeById<T extends BaseNode<T>>(rootNode: T, id: string): T {
  if (!rootNode.children || rootNode.children.length === 0) {
    return rootNode
  }

  const children = map(
    filter(rootNode.children, (node) => node.id !== id),
    (node) => removeById(node, id)
  )

  return {
    ...rootNode,
    children,
  }
}
