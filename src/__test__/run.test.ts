/**
 * @vitest-environment jsdom
 */

import { expect, it, vi } from 'vitest'
import { $ } from '../curry'
import { delay } from '../curry/util'

const span = document.createComment('span')

it('test async $.run', async () => {
  const start = performance.now()
  const timeout = 250

  await $(span).run(() => delay(timeout)).get()

  const end = performance.now() - start
  expect(end).toBeGreaterThanOrEqual(timeout)
})

const fn = vi.fn(() => {})

it('test sync $.run', async () => {
  await $(span).run(fn).run(fn).run(fn).get()

  expect(fn).toHaveBeenCalledTimes(3)

  // @ts-expect-error Covering an error cause when no input fn is provided
  await $(span).run().get()

  expect(fn).toHaveBeenCalledTimes(3)
})
