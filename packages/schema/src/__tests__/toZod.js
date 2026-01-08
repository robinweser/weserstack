import { describe, test, expect } from 'vitest'

import toZod from '../toZod'

function run(schema, value) {
  return () => {
    const result = toZod(schema).safeParse(value)

    if (!result.success) {
      throw Error(result.error)
    }
  }
}

describe('converting JSON schema to zod', () => {
  test('should convert enums', () => {
    // basic
    expect(
      run(
        {
          enum: ['foo', 'bar'],
        },
        'foo'
      )
    ).not.toThrow()
    expect(
      run(
        {
          enum: ['foo', 'bar'],
        },
        'baz'
      )
    ).toThrow()

    // default
    expect(run({ enum: ['foo', 'bar'], default: 'foo' })).not.toThrow()
  })

  test('should convert strings', () => {
    // basic
    expect(
      run(
        {
          type: 'string',
        },
        'foo'
      )
    ).not.toThrow()

    // minLength
    expect(
      run(
        {
          type: 'string',
          minLength: 4,
        },
        'foo'
      )
    ).toThrow()
    expect(
      run(
        {
          type: 'string',
          minLength: 4,
        },
        'fooo'
      )
    ).not.toThrow()

    // default
    expect(run({ type: 'string', minLength: 3, default: 'foo' })).not.toThrow()
  })

  test('should convert uri strings', () => {
    expect(
      run(
        {
          type: 'string',
          format: 'uri',
        },
        'https://example.com'
      )
    ).not.toThrow()
    expect(
      run(
        {
          type: 'string',
          format: 'uri',
        },
        'not-a-url'
      )
    ).toThrow()
  })

  test('should convert numbers', () => {
    // basic
    expect(
      run(
        {
          type: 'number',
        },
        3
      )
    ).not.toThrow()

    // minimum
    expect(
      run(
        {
          type: 'number',
          minimum: 4,
        },
        3
      )
    ).toThrow()
    expect(
      run(
        {
          type: 'number',
          minimum: 4,
        },
        5
      )
    ).not.toThrow()

    // maximum
    expect(
      run(
        {
          type: 'number',
          maximum: 5,
        },
        6
      )
    ).toThrow()
    expect(
      run(
        {
          type: 'number',
          maximum: 5,
        },
        5
      )
    ).not.toThrow()

    // default
    expect(run({ type: 'number', minimum: 3, default: 5 })).not.toThrow()
  })

  test('should convert objects', () => {
    // basic
    expect(
      run(
        {
          type: 'object',
          properties: {
            foo: { type: 'string', minLength: 3 },
            bar: { enum: ['bar', 'baz'] },
          },
        },
        {
          foo: 'foo',
          bar: 'baz',
        }
      )
    ).not.toThrow()
    expect(
      run(
        {
          type: 'object',
          properties: {
            foo: { type: 'string', minLength: 3 },
            bar: { enum: ['bar', 'baz'] },
          },
        },
        {
          foo: 'fo',
          bar: 'foo',
        }
      )
    ).toThrow()
  })

  test('should convert booleans', () => {
    // basic
    expect(
      run(
        {
          type: 'boolean',
        },
        true
      )
    ).not.toThrow()
    expect(
      run(
        {
          type: 'boolean',
        },
        'true'
      )
    ).toThrow()

    // default
    expect(run({ type: 'boolean', default: true })).not.toThrow()
  })
})
