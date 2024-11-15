/**
 * @vitest-environment jsdom
 */

import { expect, it } from 'vitest'
import { $ } from '../curry/index'
import { delay } from '../curry/util'

it('replace text using $.text()', async () => {
  const el = document.createElement('span')
  $(el).text('Hello')

  await delay(1)

  expect(el).toHaveProperty('textContent', 'Hello')
})

it('append text using $.text()', async () => {
  // Replace
  const el = document.createElement('span')
  $(el).text('Hello')
  $(el).text(' World', 'append')

  await delay(1)

  expect(el).toHaveProperty('textContent', 'Hello World')
})

it('prepend text using $.text()', async () => {
  const el = document.createElement('span')
  $(el).text('Hello')
  $(el).text('World ', 'prepend')

  await delay(1)

  expect(el).toHaveProperty('textContent', 'World Hello')
})
