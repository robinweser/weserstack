import isStyleObject from '../helpers/isStyleObject'

import { type T_Style } from '../types'

export type PropertyPriority<T = T_Style> = {
  [Property in keyof T]: number
}

export default function sortPropertyPlugin<
  T extends Record<string, any> = T_Style,
>(propertyPriority: PropertyPriority<T>) {
  function getPriority(property: keyof PropertyPriority<T>) {
    return propertyPriority[property] || 0
  }

  return function sortProperty(style: T): T {
    return Object.keys(style)
      .sort((a, b) => getPriority(a) - getPriority(b))
      .reduce((out, property) => {
        const value = style[property]

        if (isStyleObject(value)) {
          return {
            ...out,
            [property]: sortProperty(value as T),
          }
        }

        return {
          ...out,
          [property]: value,
        }
      }, {} as T)
  }
}
