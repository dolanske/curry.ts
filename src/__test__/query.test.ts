/**
 * @vitest-environment jsdom
 */

import { expect, test } from 'vitest'
import { $ } from '../curry'

test('Query new set of dom nodes for a chain using $.query', async () => {
  const p = document.createElement('p')
  const b1 = document.createElement('b')
  const b2 = document.createElement('b')

  document.body.appendChild(p)
  document.body.appendChild(b1)
  document.body.appendChild(b2)

  $('p', document)
    .run(function () {
      expect(this.nodes).toStrictEqual([p])
    })
    .query('b')
    .run(function () {
      expect(this.nodes).toStrictEqual([b1, b2])
    })
    // @ts-expect-error Test for when user does not input anything
    .query()
    .run(function () {
      expect(this.nodes).toStrictEqual([b1, b2])
    })
})
