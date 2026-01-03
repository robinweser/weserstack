import { type BaseNode } from './types.js'

export default function find<T extends BaseNode<T>>(
  rootNode: T,
  condition: (node: T) => boolean
): T | null {
  if (condition(rootNode)) {
    return rootNode
  }

  if (rootNode.children) {
    for (const node of rootNode.children) {
      const result = find(node, condition)

      if (result) {
        return result
      }
    }
  }

  return null
}
