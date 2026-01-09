import { describe, expect, it } from 'vitest'

import createRenderer from '../createRenderer.js'

describe('createRenderer', () => {
  it('returns a css function', () => {
    const css = createRenderer()

    expect(typeof css).toBe('function')
  })
})

describe('css function', () => {
  it('returns returns a tuple of the processed style object and a style node', () => {
    const css = createRenderer()

    const [style, node] = css({ color: 'red' })
    expect(style).toEqual({ color: 'red' })
    expect(node).toMatchSnapshot()
  })
  it('supports nested selectors', () => {
    const css = createRenderer()

    const [style, node] = css({ color: 'red', '&:hover': { color: 'blue' } })
    expect(style).toEqual({ color: 'red' })
    expect(node).toMatchSnapshot()
  })
})
