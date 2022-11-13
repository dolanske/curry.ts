/**
 * @vitest-environment jsdom
 */

import { describe, expect, test, vi } from 'vitest'
import { $ } from '../curry'
import { delay } from '../curry/util'

describe('Test suite for $.on', () => {
  test('Event triggering', async () => {
    const button = document.createElement('button')
    const callback = vi.fn(() => 0)

    $(button).on('click', callback)

    await delay(10)

    button.click()
    button.click()

    expect(callback).toHaveBeenCalledTimes(2)
  })

  test('Using options', async () => {
    const button = document.createElement('button')
    const callback = vi.fn(() => 0)

    $(button).on('click', callback, { once: true })

    await delay(10)

    button.click()

    // This one wont be registered anymore
    button.click()

    expect(callback).toHaveBeenCalledTimes(1)
  })
})
