import { type BaseNode } from './types.js'

export default function findAllNode<T extends BaseNode<T>>(
  rootNode: T,
  condition: (node: T) => boolean
): Array<T> {
  const nodes: Array<T> = []

  if (condition(rootNode)) {
    nodes.push(rootNode)
  }

  if (rootNode.children) {
    for (const node of rootNode.children) {
      nodes.push(...findAllNode(node, condition))
    }
  }

  return nodes
}
