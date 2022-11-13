/**
 * @vitest-environment jsdom
 */

import { expect, test, vi } from 'vitest'
import { $ } from '../curry'
import { delay } from '../curry/util'

const span = document.createComment('span')

test('Test async $.run', async () => {
  const start = performance.now()
  const timeout = 250

  await $(span).run(() => delay(timeout)).get()

  const end = performance.now() - start
  expect(end).toBeGreaterThanOrEqual(timeout)
})

const fn = vi.fn(() => {})

test('Test sync $.run', async () => {
  await $(span).run(fn).run(fn).run(fn).get()

  expect(fn).toHaveBeenCalledTimes(3)
})
