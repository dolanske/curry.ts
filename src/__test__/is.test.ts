/**
 * @vitest-environment jsdom
 */

import { describe, expect, it } from 'vitest'
import { $ } from '../curry/index'

describe('conditional element matching', () => {
  it('single condition', async () => {
    const div = document.createElement('div')
    div.id = 'test'

    expect($(div).is('#test')).toBeTruthy()
    expect($(div).is('span')).toBeFalsy()
    // @ts-expect-error Empty param check
    expect($(div).is()).toBeFalsy()
  })

  it('multiple condition and apply types', async () => {
    const div = document.createElement('div')
    div.id = 'id'
    div.classList.add('class')

    expect($(div).is(['#id', '.class'])).toBeTruthy()
    expect($(div).is(['#id', '.non-class'], 'some')).toBeTruthy()
    expect($(div).is(['span', 'h1'])).toBeFalsy()
    expect($(div).is(['span', 'h1'], 'none')).toBeTruthy()
  })
})
