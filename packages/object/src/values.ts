export default function values<T extends Record<string, any>>(object: T) {
  return Object.values(object) as Array<T[keyof T]>
}
