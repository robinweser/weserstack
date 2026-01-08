import { describe, test, expect } from 'vitest'

import alpha from '../alpha'

describe('alpha', () => {
  test('alterating alpha should work', () => {
    expect(alpha('var(--red)', 0.2)).toBe(
      'hsl(from var(--red) h s l / max(0, min(1, 0.2)))'
    )
  })
})
