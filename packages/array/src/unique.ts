export default function unique<T>(arr: Array<T>): Array<T> {
  return Array.from(new Set(arr))
}
