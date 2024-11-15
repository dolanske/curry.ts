/**
 * @vitest-environment jsdom
 */

import { expect, it } from 'vitest'
import { $, Curry } from '../curry'
import { isNil } from '../curry/util'

it('reactive data binding', () => {
  // Default state access
  $(document).state({
    test: 10,
  }, ({ test }, inst) => {
    expect(test).toBe(10)
    expect(inst).toBeInstanceOf(Curry)
  })

  // Update dom
  const el = document.createElement('div')
  const binding = $(el).state({ count: 0 }, function ({ count }) {
    this.textContent = isNil(count) ? '' : String(count)
  })

  expect(el.textContent).toBe('0')
  binding.count++
  expect(el.textContent).toBe('1')
  binding.count = 10
  expect(el.textContent).toBe('10')
  expect(binding.count).toBe(10)

  // @ts-expect-error We are deleting an existing property
  delete binding.count
  expect(el.textContent).toBe('')
})
