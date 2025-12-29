import findNode from './findNode.js'
import { type BaseNode } from './types.js'

export default function getParentNode<T extends BaseNode<T>>(
  rootNode: T,
  id: string
): T | null {
  return findNode(rootNode, (node) =>
    Boolean(node.children && node.children.find((node) => node.id === id))
  )
}
