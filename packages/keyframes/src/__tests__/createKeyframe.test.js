import { describe, test, expect } from 'vitest'

import createKeyframe from '../createKeyframe'

describe('createKeyframe', () => {
  test('creating keyframes should return a unique animationName', () => {
    const [animationName, node] = createKeyframe({
      from: {
        color: 'blue',
      },
      to: { fontSize: '16px', color: 'red' },
    })

    expect(animationName).toBe('_x9ioxkw')
    expect(node).toMatchSnapshot()
  })

  test('creating keyframes should re-use values from cache', () => {
    const [_1] = createKeyframe({
      to: { color: 'red' },
    })

    const [_2] = createKeyframe({
      to: { color: 'red' },
    })

    expect(_1).toBe('_x1nwcv5g')
    expect(_1).toBe(_2)
  })

  test('creating keyframes should accept a nonce', () => {
    const nonce = 'NONCE'

    const [_, node] = createKeyframe(
      {
        to: { color: 'red' },
      },
      nonce
    )

    expect(node.props.nonce).toBe(nonce)
  })
})
