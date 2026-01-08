export default function pick<
  T extends Record<PropertyKey, any>,
  K extends keyof T,
>(obj: T, keys: Array<K>): Pick<T, K> {
  const pickedObj = {} as Pick<T, K>

  for (let i = 0, len = keys.length; i < len; ++i) {
    const key = keys[i]
    if (key in obj) {
      // @ts-ignore
      pickedObj[key] = obj[key]
    }
  }

  return pickedObj
}
