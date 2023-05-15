/**
 * @vitest-environment jsdom
 */

import { expect, test } from 'vitest'
import { $ } from '../curry'

// #1 Add test for animation completing
// #2 Trigger onFinish
// #3 Test that all chained functions behind animation wait for it to complete

test('Animation chain stop', async () => {
  const start = Date.now()
  const DURATION = 100

  $(document.body).animate({
    height: '500px',
  }, { duration: DURATION }).await

  const end = Date.now()
  console.log(start, end)

  expect(end - start).toBeGreaterThanOrEqual(DURATION)
})
