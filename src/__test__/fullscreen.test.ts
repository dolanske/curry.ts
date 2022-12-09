/**
 * @vitest-environment jsdom
 */

import { expect, test } from 'vitest'
import { $ } from '../curry'

test('Opening of fullscreen', () => {
  const wrapper = document.createElement('div')
  const target = document.createElement('div')

  document.body.appendChild(wrapper)
  document.body.appendChild(target)

  $(target, document).fullscreen({
    onOpen: () => {
      expect(document.fullscreenElement).toStrictEqual(target)
    },
  })
})
