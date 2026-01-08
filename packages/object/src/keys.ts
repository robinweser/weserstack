export default function keys<T extends Record<string, any>>(object: T) {
  return Object.keys(object) as Array<keyof T>
}
