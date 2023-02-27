import { expect, it } from 'vitest'

const toUpperCase=(value: string)=> value.toUpperCase()

it('toUpperCase', () => {
    const result = toUpperCase('foobar')
    expect(result).toMatchInlineSnapshot('"FOOBAR"')
  })