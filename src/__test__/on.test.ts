/**
 * @vitest-environment jsdom
 */

import { describe, expect, it, vi } from 'vitest'
import { $ } from '../curry'
import { delay } from '../curry/util'

describe('test suite for $.on', () => {
  it('event triggering', async () => {
    const button = document.createElement('button')
    const callback = vi.fn(() => 0)

    $(button).on('click', callback)

    await delay(10)

    button.click()
    button.click()

    expect(callback).toHaveBeenCalledTimes(2)
  })

  it('using options', async () => {
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
