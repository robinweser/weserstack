import useStorage, { type Config } from './useStorage'
import createIndexedStorage from './createIndexedStorage'

export default function useIndexedStorage<T>(
  database: string,
  table: string,
  key: string,
  initialState: T,
  config?: Config<T>
) {
  const storage = createIndexedStorage(database, table)
  return useStorage<T>(() => storage, key, initialState, config)
}
