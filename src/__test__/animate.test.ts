/**
 * @vitest-environment jsdom
 */

import { expect, test } from 'vitest'
import { $ } from '../curry'
import { delay, toEl } from '../curry/util'

// #1 Add test for animation completing
// #2 Trigger onFinish
// #3 Test that all chained functions behind animation wait for it to complete

test('Basic animation options', async () => {
  $(document.body).animate({ height: '500px' }, {
    duration: 10,
    easing: 'ease-in-out',
    keepStyle: true,
    onFinish(animation) {
      expect(animation).toBeInstanceOf(Animation)
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
      animation.cancel()
    },
    onCancel(animation, err) {
      expect(animation.playState).toBe('cancel')
      console.log(err)
    },
  })
})

test('Animate multiple elements', () => {
  for (let i = 0; i < 3; i++)
    document.body.appendChild(document.createElement('div'))

  $(document).children().animate({
    height: '500px',
  }, {
    duration: 1,
    keepStyle: true,
    onFinish() {
      $(document).children().each(({ self }) => {
        expect(toEl(self).style.height).toBe('500px')
      })
    },
  })
})
