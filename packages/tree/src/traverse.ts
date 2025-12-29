import { arrayEach } from '@weser/loops'

import { type BaseNode } from './types.js'

export default function traverse<T extends BaseNode<T>>(
  rootNode: T,
  callback: (node: T) => void,
  type: 'top-down' | 'bottom-up' = 'top-down'
) {
  if (type === 'top-down') {
    callback(rootNode)
  }

  if (rootNode.children) {
    arrayEach(rootNode.children, (node) => traverse(node, callback, type))
  }

  if (type === 'bottom-up') {
    callback(rootNode)
  }
}
