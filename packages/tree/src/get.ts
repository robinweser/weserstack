import { type BaseNode } from './types'

export default function get<T extends BaseNode<T>>(
  rootNode: T,
  id: string
): T | null {
  if (rootNode.id === id) {
    return rootNode
  }

  if (rootNode.children) {
    for (const node of rootNode.children) {
      const result = get(node, id)

      if (result) {
        return result
      }
    }
  }

  return null
}
