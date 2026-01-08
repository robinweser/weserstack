export default function entries<T extends Record<string, any>>(object: T) {
  return Object.entries(object) as Array<[keyof T, T[keyof T]]>
}
