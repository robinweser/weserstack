import { type BaseNode, type BaseNodeInput } from './types.js'

export default function createNode<T extends BaseNode<T>>(
  node: BaseNodeInput<T>
): T {
  const id = crypto.randomUUID()

  return {
    ...node,
    id,
  } as T
}
