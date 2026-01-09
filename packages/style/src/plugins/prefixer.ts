import { objectEach } from '@weser/loops'
import isObject from 'isobject'

import { type T_Style } from '../types'
import { type T_Fallback } from './fallbackValue'

export default function prefixerPlugin() {
  return function addVendorPrefixes(style: T_Style) {
    const prefixed: T_Style = {}

    objectEach(style, (value, property) => {
      if (isObject(value)) {
        prefixed[property] = addVendorPrefixes(value)
      } else {
        if (prefixes[property]) {
          const prefixedProperty = prefixes[property] + capitalize(property)
          prefixed[prefixedProperty as keyof T_Style] = value
        }
        prefixed[property] = value
      }
    })

    return prefixed
  }
}
export const fallbacks: Array<T_Fallback> = [
  {
    property: [
      'width',
      'minWidth',
      'maxWidth',
      'height',
      'minHeight',
      'maxHeight',
    ],
    fallback: (value: string) => {
      if (value === 'min-content') {
        return ['-webkit-min-content', 'min-content']
      }
    },
  },
  {
    property: [
      'width',
      'minWidth',
      'maxWidth',
      'height',
      'minHeight',
      'maxHeight',
    ],
    fallback: (value: string) => {
      if (value === 'max-content') {
        return ['-webkit-max-content', 'max-content']
      }
    },
  },
]

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const w = 'Webkit'
const m = 'Moz'
const prefixes: Partial<Record<keyof T_Style, string>> = {
  textEmphasisPosition: w,
  textEmphasis: w,
  textEmphasisStyle: w,
  textEmphasisColor: w,
  boxDecorationBreak: w,
  maskImage: w,
  maskMode: w,
  maskRepeat: w,
  maskPosition: w,
  maskClip: w,
  maskOrigin: w,
  maskSize: w,
  maskComposite: w,
  mask: w,
  maskBorderSource: w,
  maskBorderMode: w,
  maskBorderSlice: w,
  maskBorderWidth: w,
  maskBorderOutset: w,
  maskBorderRepeat: w,
  maskBorder: w,
  maskType: w,
  appearance: w,
  userSelect: w,
  backdropFilter: w,
  clipPath: w,
  hyphens: w,
  textOrientation: w,
  tabSize: m,
  fontKerning: w,
  textSizeAdjust: w,
  textDecorationStyle: w,
  textDecorationSkip: w,
  textDecorationLine: w,
  textDecorationColor: w,
}
