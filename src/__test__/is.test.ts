/**
 * @vitest-environment jsdom
 */

import { describe, expect, test } from 'vitest'
import { $ } from '../curry/index'
// TODO: rewrite after function refactor

describe('Conditional element matching', () => {
  test.skip('Single condition', async () => {
    const div = document.createElement('div')
    div.id = 'test'
    expect($(div).is('#test')).toBe(true)
    expect($(div).is('span')).toBe(false)
  })
  test.skip('Multiple condition and apply types', async () => {
    const div = document.createElement('div')
    div.id = 'id'
    div.classList.add('class')
    expect($(div).is(['#id', '.class'], 'every')).toBe(true)
    expect($(div).is(['#id', '.non-class'], 'some')).toBe(false)
    expect($(div).is(['span', 'h1'])).toBe(false)
  })
})
