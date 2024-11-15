/**
 * @vitest-environment jsdom
 */

import { expect, it } from 'vitest'
import { $ } from '../curry/index'
import { delay } from '../curry/util'

it('return attributes from selected elements', async () => {
  const div = document.createElement('div')
  div.title = 'Hello World'
  div.id = 'test'

  const title = $(div).getAttr('title')
  expect(title).toBe('Hello World')

  const attributes = $(div).getAttr(['title', 'id'])

  expect(attributes).toStrictEqual(['Hello World', 'test'])

  const nonExistent = $(div).getAttr(['salam'])
  expect(nonExistent).toBe(null)
})

it('set attributes for selected elements', async () => {
  const div = document.createElement('div')

  $(div).setAttr('title', 'Hello World')
  await delay(10)
  expect($(div).getAttr('title')).toBe('Hello World')

  $(div).setAttr({
    id: 'Henlo',
  })
  await delay(10)
  expect($(div).getAttr('id')).toBe('Henlo')

  $(div).setAttr([{ focus: 'true' }])
  await delay(10)
  expect($(div).getAttr('focus')).toBe('true')
})
