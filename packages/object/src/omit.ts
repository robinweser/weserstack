export default function omit<
  T extends Record<PropertyKey, any>,
  K extends keyof T,
>(obj: T, keys: Array<K>): Omit<T, K> {
  const omittedObj = {} as Omit<T, K>

  for (const key in obj) {
    if (!keys.includes(key as unknown as K)) {
      // @ts-ignore
      omittedObj[key] = obj[key]
    }
  }

  return omittedObj
}
