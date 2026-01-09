import { objectEach, arrayReduce } from '@weser/loops'
import { assignStyle } from 'css-in-js-utils'
import { CSSProperties, ReactNode } from 'react'

import createStyleNode from './createStyleNode'
import hash from '../helpers/hash'
import { T_Style, T_Props, T_Context } from '../types'

type StyleInput<T = T_Style> = undefined | T | Array<StyleInput<T>>

type Plugin = (style: T_Style, context: T_Context) => T_Style
type Config = {
  plugins?: Array<Plugin>
  mergeStyle?: typeof assignStyle
  devMode?: boolean
}

export default function createRenderer<T extends Record<string, any> = T_Style>(
  config: Config = {}
) {
  const { plugins = [], mergeStyle = assignStyle, devMode = false } = config

  return function css(...style: Array<StyleInput<T>>) {
    const flags: Record<string, string> = {}
    // we use a map to cache nodes to avoid duplicate
    const nodes: Map<string, ReactNode> = new Map()
    const props: T_Props = {
      style: {},
    }

    function createNode(css: string) {
      const id = hash(css)
      const node = createStyleNode(id, css)
      nodes.set(id, node)
    }

    const context: T_Context = {
      devMode,
      createNode,
      props,
      mergeStyle,
    }

    // we ignore the "Type instantiation is excessively deep and possibly infinite."
    // @ts-ignore
    const flattened = style.flat(Infinity)
    const filtered = flattened.filter(Boolean)
    // @ts-ignore
    const merged = mergeStyle({} as T, ...filtered)
    const resolved = resolveStyle(merged as T, plugins, flags, context)
    props.style = resolved

    if (Object.keys(flags).length === 0) {
      return [props, nodes.size > 0 ? nodes.values() : null] as const
    }

    const flagsSetup = Object.values(flags).map(getFlagSetup)
    const flagsUsage = Object.entries(flags).map(([property, flag]) =>
      getFlagUsage(property, flag)
    )

    const join = devMode ? '\n' : ''
    const id = Object.values(flags).sort().join('_')
    const markup = `*{${flagsSetup.join(join)}}${join}${flagsUsage.join(join)}`
    const node = createStyleNode(id, markup)

    return [props, [...nodes.values(), node]] as const
  }
}

function resolveStyle(
  style: T_Style,
  plugins: Array<Plugin>,
  flags: Record<string, string> = {},
  context: T_Context
): CSSProperties {
  const processed = arrayReduce(
    plugins,
    (style, plugin) => plugin(style, context),
    style
  )

  const { devMode } = context

  objectEach(processed, (value, property) => {
    if (typeof value === 'object' && value !== null) {
      const resolved = resolveStyle(value, plugins, flags, context)
      const flag = devMode
        ? property.replace(/ /g, '-').replace(/[^a-z0-9-]/gi, '')
        : hash(property as string)
      flags[property] = flag

      objectEach(resolved, (value, key) => {
        const fallback = processed[key] ?? 'unset'
        processed[key as keyof T_Style] =
          `var(--${flag}-1, ${value}) var(--${flag}-0, ${fallback})`
      })

      delete processed[property]
    }
  })

  return processed
}

function getFlagSetup(flag: string) {
  return `--${flag}-0:initial;--${flag}-1: ;`
}

function getFlagUsage(property: string, flag: string) {
  const usage = `--${flag}-0: ;--${flag}-1:initial`

  if (property.startsWith('@')) {
    return `${property}{*{${usage}}}`
  }

  return `${property.replace(/&/gi, '*')}{${usage}}`
}
