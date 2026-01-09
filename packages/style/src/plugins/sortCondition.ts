import { arrayEach } from '@weser/loops'
import isPlainObject from 'isobject'
import sortCSSMediaQueries from 'sort-css-media-queries'

import { T_Style } from '../types'

export default function sortConditionPlugin(
  sortFn: (left: string, right: string) => number
) {
  return function sortCondition(style: T_Style) {
    const sorted: T_Style = {}

    const entries = Object.entries(style)
    const primitive = entries.filter(([_, value]) => !isPlainObject(value))
    const nested = entries.filter(([_, value]) => isPlainObject(value))

    arrayEach(primitive, ([property, value]) => {
      sorted[property as keyof T_Style] = value
    })

    const sortedNested = nested.sort((left, right) => sortFn(left[0], right[0]))

    arrayEach(sortedNested, ([property, value]) => {
      sorted[property as keyof T_Style] = sortCondition(value)
    })

    return sorted
  }
}

export function sortMobileFirst(left: string, right: string) {
  const leftIsPseudo = left.startsWith(':')
  const rightIsPseudo = right.startsWith(':')
  const leftIsMedia = left.startsWith('@media')
  const rightIsMedia = right.startsWith('@media')
  const leftIsSupports = left.startsWith('@supports')
  const rightIsSupports = right.startsWith('@supports')
  const leftIsOther = !leftIsPseudo && !leftIsMedia && !leftIsSupports
  const rightIsOther = !rightIsPseudo && !rightIsMedia && !rightIsSupports

  if (leftIsOther && !rightIsOther) return -1
  if (!leftIsOther && rightIsOther) return 1

  if (leftIsOther && rightIsOther) {
    return left.localeCompare(right)
  }

  if (leftIsPseudo && !rightIsPseudo) return -1
  if (!leftIsPseudo && rightIsPseudo) return 1

  if (leftIsPseudo && rightIsPseudo) {
    const lvfhaOrder: Record<string, number> = {
      ':link': 1,
      ':visited': 2,
      ':focus': 3,
      ':hover': 4,
      ':active': 5,
    }

    const leftOrder = lvfhaOrder[left] ?? 6
    const rightOrder = lvfhaOrder[right] ?? 6

    if (leftOrder !== rightOrder) {
      return leftOrder - rightOrder
    }

    return left.localeCompare(right)
  }

  if (leftIsMedia && !rightIsMedia) {
    return -1
  }
  if (!leftIsMedia && rightIsMedia) {
    return 1
  }

  if (leftIsMedia && rightIsMedia) {
    return sortCSSMediaQueries(left, right)
  }

  if (leftIsSupports && !rightIsSupports) return 1
  if (!leftIsSupports && rightIsSupports) return -1

  return left.localeCompare(right)
}
