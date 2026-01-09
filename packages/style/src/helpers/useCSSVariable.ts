import { useId } from 'react'

export default function useCSSVariable(
  fallbackValue?: string
): [`--${string}`, string] {
  const id = useId()

  const name = id.replace(/:/g, '_')
  const variable = `--${name}` as const

  if (fallbackValue) {
    return [variable, `var(${variable}, ${fallbackValue})`]
  }

  return [variable, `var(${variable})`]
}
