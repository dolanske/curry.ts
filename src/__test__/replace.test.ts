/**
 * @vitest-environment jsdom
 */

import { expect, test } from 'vitest'
import { $, Curry } from '../curry'

function prepareDom() {
  const wrapper = document.createElement('div')
  const child = document.createElement('i')
  const replacer = document.createElement('b')

  return { wrapper, child, replacer }
}

test('Replace a child element using $.replace', async () => {
  const { wrapper, child, replacer } = prepareDom()
  wrapper.appendChild(child)

  // Replace with an element
  await $(wrapper).replace(child, replacer).get()
  expect(wrapper.firstChild).toStrictEqual(replacer)

  // Replace with a string
  await $(wrapper).replace(replacer, '<span>Hello</span>').get()
  expect(wrapper.children[0].textContent).toBe('Hello')
})

test('Replace a child using a string selector', async () => {
  const { wrapper, child, replacer } = prepareDom()

  child.id = 'child'
  replacer.id = 'replacer'

  wrapper.appendChild(child)
  document.body.appendChild(wrapper)
  document.body.appendChild(replacer)

  await $(wrapper).replace('#child', '#replacer', document).get()
  expect(wrapper.firstChild).toStrictEqual(replacer)
})

test('Cover any null options', async () => {
  const { wrapper, child } = prepareDom()

  await $(wrapper).replace('#nonexistent', child).get()
  expect(wrapper.firstChild).toBeNull()

  wrapper.appendChild(child)

  await $(wrapper).replace(child, '#alsonotexisting').get()
  expect(wrapper.firstChild).toStrictEqual(child)
})

test('Replace a child element using static replace', async () => {
  const { wrapper, child, replacer } = prepareDom()

  wrapper.appendChild(child)

  Curry.replace(child, replacer)
  expect(wrapper.firstChild).toStrictEqual(replacer)
})
