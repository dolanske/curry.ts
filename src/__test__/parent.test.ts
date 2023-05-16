/**
 * @vitest-environment jsdom
 */

import { expect, test } from 'vitest'
import { $ } from '../curry/index'

test('Select parent element', async () => {
  // Prepare some DOM elements
  const div = document.createElement('div')
  const first = document.createElement('span')
  first.id = 'first'
  div.id = 'divider'
  div.appendChild(first)

  const parent = await $(first).parent().get()
  const noParent = await $(div).parent().get()
  const parentButWrongSelector = await $(first).parent('#div').get()

  expect(parent).toStrictEqual([div])
  expect(noParent).toBeUndefined()
  expect(parentButWrongSelector).toBeUndefined()
})

test('Select multiple parent elements', async () => {
  // Prepare some DOM elements

  const parent1 = document.createElement('div')
  parent1.id = 'parent1'
  const parent2 = document.createElement('div')
  parent2.id = 'parent2'

  const child1 = document.createElement('span')
  child1.id = 'child1'

  const child2 = document.createElement('span')
  child2.id = 'child2'

  parent1.appendChild(child1)
  parent2.appendChild(child2)

  // #('span').parent().get()
  const parents = await $([child1, child2]).parent().get()
  expect(parents).toStrictEqual([parent1, parent2])

  // Select only 1 parent from multople
  const shouldBeSecond = await $([child1, child2]).parent('#parent2').get()
  expect(shouldBeSecond).toStrictEqual([parent2])
})
