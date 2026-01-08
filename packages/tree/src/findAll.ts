import { type BaseNode } from './types.js'

export default function findAll<T extends BaseNode<T>>(
  rootNode: T,
  condition: (node: T) => boolean
): Array<T> {
  const nodes: Array<T> = []

  if (condition(rootNode)) {
    nodes.push(rootNode)
  }

  if (rootNode.children) {
    for (const node of rootNode.children) {
      nodes.push(...findAll(node, condition))
    }
  }

  return nodes
}
