import { type BaseNode } from './types.js'

export default function findNode<T extends BaseNode<T>>(
  rootNode: T,
  condition: (node: T) => boolean
): T | null {
  if (condition(rootNode)) {
    return rootNode
  }

  if (rootNode.children) {
    for (const node of rootNode.children) {
      const result = findNode(node, condition)

      if (result) {
        return result
      }
    }
  }

  return null
}
