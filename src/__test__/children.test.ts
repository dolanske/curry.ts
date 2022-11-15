/**
 * @vitest-environment jsdom
 */

import { expect, test } from 'vitest'
import { $ } from '../curry'

test('Get all children using $.children', () => {
  const first = document.createElement('span')
  const second = document.createElement('span')

  document.body.appendChild(first)
  document.body.appendChild(second)

  $(document.body).children().run(function () {
    expect(this.nodes).toStrictEqual([first, second])
  })
})

test('Select specific children with a selector in $.children', () => {
  const first = document.createElement('b')
  const second = document.createElement('p')

  document.body.appendChild(first)
  document.body.appendChild(second)

  $(document.body, document).children('p').run(function () {
    expect(this.nodes).toStrictEqual([second])
  })
})
