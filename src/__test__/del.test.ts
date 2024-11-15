/**
 * @vitest-environment jsdom
 */

import { expect, it } from 'vitest'
import { $ } from '../curry/index'
import { delay } from '../curry/util'

it('remove html node using $.del()', async () => {
  const div = document.createElement('div')

  div.appendChild(document.createElement('span'))
  div.appendChild(document.createElement('h2'))

  $(div.children).del()

  await delay(1)

  expect(div.children).toHaveLength(0)
})

it('remove nodes using string selector', async () => {
  const div = document.createElement('div')

  div.appendChild(document.createElement('span'))

  $(div.children).del('p')
  await delay(1)

  expect(div.children).toHaveLength(1)
})
