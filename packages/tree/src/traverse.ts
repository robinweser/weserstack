import { each } from '@weser/array'

import { type BaseNode } from './types'

export default function traverse<T extends BaseNode<T>>(
  rootNode: T,
  callback: (node: T) => void,
  type: 'top-down' | 'bottom-up' = 'top-down'
) {
  if (type === 'top-down') {
    callback(rootNode)
  }

  if (rootNode.children) {
    each(rootNode.children, (node) => traverse(node, callback, type))
  }

  if (type === 'bottom-up') {
    callback(rootNode)
  }
}
