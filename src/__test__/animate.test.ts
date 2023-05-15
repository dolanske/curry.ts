/**
 * @vitest-environment jsdom
 */

import { expect, test } from 'vitest'
import { $ } from '../curry'
import { delay } from '../curry/util'

// #1 Add test for animation completing
// #2 Trigger onFinish
// #3 Test that all chained functions behind animation wait for it to complete

test('Animation chain stop', async () => {
  const start = Date.now()
  const DELAY = 100

  $(document.body).animate({ height: '500px' }, { duration: DELAY }).await

  await delay(DELAY)
  const end = Date.now()
  expect(end - start).toBeGreaterThanOrEqual(DELAY)
})
