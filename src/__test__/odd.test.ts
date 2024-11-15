/**
 * @vitest-environment jsdom
 */

import { expect, it } from 'vitest'
import { $, Curry } from '../curry/index'
import { delay } from '../curry/util'

it('select every odd element', async () => {
  const div = document.createElement('div')

  for (let i = 0; i < 4; i++) {
    const span = document.createElement('span')
    span.id = `span${i}`
    div.appendChild(span)
  }

  const oddChildren = await $(div.children).odd().get()

  await delay(10)

  expect(oddChildren).toHaveLength(2)
  expect(oddChildren).toStrictEqual([div.children[1], div.children[3]])
})

it('apply correct callback parameters to $.odd()', () => {
  const div = document.createElement('div')
  for (let i = 0; i < 2; i++) {
    const span = document.createElement('span')
    span.id = `span${i}`
    div.appendChild(span)
  }

  $(div.children).odd(function ({ self, instance }) {
    expect(this).toStrictEqual(div.children[1])
    expect(self).toStrictEqual(div.children[1])
    expect(instance).toBeInstanceOf(Curry)
  })
})
