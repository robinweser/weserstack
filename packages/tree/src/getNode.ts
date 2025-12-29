import { type BaseNode } from './types.js'

export default function getNode<T extends BaseNode<T>>(
  rootNode: T,
  id: string
): T | null {
  if (rootNode.id === id) {
    return rootNode
  }

  if (rootNode.children) {
    for (const node of rootNode.children) {
      const result = getNode(node, id)

      if (result) {
        return result
      }
    }
  }

  return null
}
