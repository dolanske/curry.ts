/**
 * @vitest-environment jsdom
 */

import { describe, expect, test } from 'vitest'
import { $ } from '../curry'

describe('$.slide() methods', () => {
  test('slideDown', async () => {
    const el = document.createElement('div')
    document.body.appendChild(el)

    const start = performance.now()

    // FIXME: animation does not wait
    $(document.body.children[0]).slideUp(300).run(() => {
      expect(performance.now() - start).toBeGreaterThanOrEqual(300)
      expect(el.style.getPropertyValue('display')).toBe('none')
      expect(el.style.getPropertyValue('overflow')).toBe('hidden')
    })
  })
})
