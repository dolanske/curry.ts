/**
 * @vitest-environment jsdom
 */

import { expect, it } from 'vitest'
import { $ } from '../curry/index'

it('return nodes from current chain', async () => {
  const div = document.createElement('div')
  const returnDiv = await $(div).get()
  expect(returnDiv).toStrictEqual([div])

  const span1 = document.createElement('span')
  const span2 = document.createElement('span')

  div.appendChild(span1)
  div.appendChild(span2)

  const returnSpans = await $(div).children().get()

  expect(returnSpans).toStrictEqual([span1, span2])
})

it('return specific Element property', async () => {
  const div = document.createElement('div')
  div.id = 'test'
  const returnDiv = await $(div).get('id')
  expect(returnDiv).toBe('test')
})

it('return specific attributes from multiple elements', async () => {
  const span1 = document.createElement('span')
  span1.title = 'Hello'
  const span2 = document.createElement('span')
  span2.title = 'World'

  document.body.appendChild(span1)
  document.body.appendChild(span2)

  const titles = await $(document.body).children().get('title')
  expect(titles).toStrictEqual(['Hello', 'World'])
})
