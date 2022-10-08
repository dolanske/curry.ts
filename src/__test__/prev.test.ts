/**
 * @vitest-environment jsdom
 */

import { expect, test } from 'vitest'
import { $ } from '../curry/index'

test('Selects the next node $.prev()', async () => {
  // Prepare some DOM elements
  const div = document.createElement('div')
  const first = document.createElement('span')
  const second = document.createElement('span')
  const third = document.createElement('span')
  first.id = 'first'
  second.id = 'second'
  third.id = 'third'
  div.appendChild(first)
  div.appendChild(second)
  div.appendChild(third)

  /* Getting elements which exist */

  const shouldBeSecond = await $(third).prev().get()
  expect(shouldBeSecond).toBe(second)
  expect(shouldBeSecond).not.toBe(first)

  const shouldBeThird = await $(third).prev(2).get()
  expect(shouldBeThird).toBe(first)

  /* Getting elements which should not exist */

  const shouldNotExist = await $(third).prev(10).get()
  const shouldNotExistEither = await $(third)
    .prev()
    .prev()
    .prev()
    .prev()
    .prev()
    .get()

  expect(shouldNotExist).toBe(undefined)
  expect(shouldNotExistEither).toBe(undefined)
})
