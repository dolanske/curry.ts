/**
 * @vitest-environment jsdom
 */

import { expect, test } from 'vitest'
import { $ } from '../curry'

// #1 Add test for animation completing
// #2 Trigger onFinish
// #3 Test that all chained functions behind animation wait for it to complete

test('Basic animation options', async () => {
  $(document.body).animate({ height: '500px' }, {
    duration: 10,
    easing: 'ease-in-out',
    keepStyle: true,
    onFinish() {
      expect(document.body.style.height).toBe('500px')
    },
  })

  // await delay(DELAY)
  // const end = Date.now()
  // expect(end - start).toBeGreaterThanOrEqual(DELAY)
})
