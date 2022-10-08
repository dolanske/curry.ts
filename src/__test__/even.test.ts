/**
 * @vitest-environment jsdom
 */

import { expect, test } from 'vitest'
import { $, Curry } from '../curry/index'
import { delay } from '../curry/util'

test('Select every even element', async () => {
  const div = document.createElement('div')

  for (let i = 0; i < 4; i++) {
    const span = document.createElement('span')
    span.id = `span${i}`
    div.appendChild(span)
  }

  const evenChildren = await $(div.children).even().get()

  await delay(10)

  expect(evenChildren).toHaveLength(2)
  expect(evenChildren).toStrictEqual([div.children[0], div.children[2]])
})

test('Apply correct callback parameters to $.even()', () => {
  const div = document.createElement('div')
  for (let i = 0; i < 2; i++) {
    const span = document.createElement('span')
    span.id = `span${i}`
    div.appendChild(span)
  }

  $(div.children).even(function ({ self, instance }) {
    expect(this).toStrictEqual(div.children[0])
    expect(self).toStrictEqual(div.children[0])
    expect(instance).toBeInstanceOf(Curry)
  })
})
