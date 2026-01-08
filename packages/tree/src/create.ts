import { type BaseNode, type BaseNodeInput } from './types'

export default function create<T extends BaseNode<T>>(
  node: BaseNodeInput<T>
): T {
  const id = crypto.randomUUID()

  return {
    ...node,
    id,
  } as T
}
