type DistributiveOmit<T, K extends PropertyKey> = T extends any
  ? Omit<T, K>
  : never

export type BaseNode<T> = {
  id: string
  children: Array<T> | null
}

export type BaseNodeInput<T> = DistributiveOmit<T, 'id'>
