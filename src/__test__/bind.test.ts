/**
 * @vitest-environment jsdom
 */

import { expect, test } from 'vitest'
import { $, Curry } from '../curry'
import { isNil } from '../curry/util'

test('Reactive data binding', () => {
  // Default state access
  $(document).bind({
    test: 10,
  }, ({ test }, inst) => {
    expect(test).toBe(10)
    expect(inst).toBeInstanceOf(Curry)
  })

  // Update dom
  const el = document.createElement('div')
  const binding = $(el).bind({ count: 0 }, function ({ count }) {
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
