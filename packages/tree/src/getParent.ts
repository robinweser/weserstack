import find from './find.js'
import { type BaseNode } from './types.js'

export default function getParent<T extends BaseNode<T>>(
  rootNode: T,
  id: string
): T | null {
  return find(rootNode, (node) =>
    Boolean(node.children && node.children.find((node) => node.id === id))
  )
}
