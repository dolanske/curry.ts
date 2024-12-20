/**
 * @vitest-environment jsdom
 */

import { expect, it } from 'vitest'
import { $, Curry } from '../curry/index'
import { delay } from '../curry/util'

it('iterate over selected elements and execute a provided callback', async () => {
  const div = document.createElement('div')

  for (let i = 0; i < 3; i++) {
    const span = document.createElement('span')
    span.id = `span${i}`
    div.appendChild(span)
  }

  $(div)
    .children()
    .asyncEach(async (next, { self, index, instance }) => {
      expect(self).toStrictEqual(div.children[index])
      expect(instance).toBeInstanceOf(Curry)
      expect(index).toBeDefined()

      await delay(100)

      next()
    })
})
