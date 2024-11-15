/**
 * @vitest-environment jsdom
 */

import { describe, expect, it, vi } from 'vitest'
import { $ } from '../curry/index'
import { delay } from '../curry/util'

describe('synthetic events', () => {
  it('simple event', async () => {
    const spied = vi.fn(() => {})

    $(document).on('test', () => spied())
    $(document).trigger('test')
    await delay(10)
    expect(spied).toHaveBeenCalled()
  })

  it('using payload', async () => {
    $(document).on('test', (event) => {
      expect(event.detail).toBe('Hello World')
    })

    $(document).trigger('test', 'Hello World')
  })
})
