/**
 * @vitest-environment jsdom
 */

import { expect, it } from 'vitest'
import { $, Curry } from '../curry/index'

it('return the last matched element using $.last()', async () => {
  const div = document.createElement('div')
  const span1 = document.createElement('span')
  const span2 = document.createElement('span')
  span1.id = 'first'
  span2.id = 'second'
  div.appendChild(span1)
  div.appendChild(span2)

  const shouldBeLast = await $(div.children).last().get()
  expect(shouldBeLast).toStrictEqual([span2])
})

it('apply correct callback parameters to $.last()', () => {
  const div = document.createElement('div')
  const span1 = document.createElement('span')
  const span2 = document.createElement('span')
  span1.id = 'first'
  span2.id = 'second'
  div.appendChild(span1)
  div.appendChild(span2)

  $(div.children).last(function ({ self, instance, index }) {
    expect(this).toStrictEqual(span2)
    expect(self).toStrictEqual(span2)
    expect(instance).toBeInstanceOf(Curry)
    expect(index).toBe(1)
  })
})
