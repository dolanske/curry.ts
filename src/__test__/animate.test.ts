/**
 * @vitest-environment jsdom
 */

import { expect, test } from 'vitest'
import { $ } from '../curry'
import { delay } from '../curry/util'

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
})

test('Cancel animation mid execution', () => {
  $(document.body).animate({ height: 0 }, {
    duration: 1000,
    async onStart(animation) {
      expect(animation.playState).toBe('running')
      await delay(50)
      animation.finish()
    },
    onCancel(animation) {
      expect(animation.playState).toBe('finished')
    },
  })
})
