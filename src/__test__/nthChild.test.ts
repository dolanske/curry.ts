/**
 * @vitest-environment jsdom
 */

import { expect, it } from 'vitest'
import { $, Curry } from '../curry/index'

const div = document.createElement('div')

for (let i = 0; i < 5; i++) {
  const span = document.createElement('span')
  span.id = `span${i}`
  div.appendChild(span)
}

it('select an element child at provided index', async () => {
  const shouldBeSecond = await $(div).nthChild(2).get()
  expect(shouldBeSecond).toStrictEqual([div.children[1]])

  const shouldBeFirstAndThird = await $(div).nthChild([1, 3]).get()
  expect(shouldBeFirstAndThird).toStrictEqual([
    div.children[0],
    div.children[2],
  ])
})

it('select an element child at provided index with callback', async () => {
  $(div).nthChild([2, 3], function ({ self, index, instance }) {
    if (index === 2) {
      expect(this).toStrictEqual(div.children[1])
      expect(self).toStrictEqual(div.children[1])
      expect(index).toBe(2)
    }
    else if (index === 3) {
      expect(index).toBe(3)
      expect(this).toStrictEqual(div.children[2])
      expect(self).toStrictEqual(div.children[2])
    }

    expect(instance).toBeInstanceOf(Curry)
  })

  $(div).nthChild(4, function ({ self, index, instance }) {
    expect(this).toStrictEqual(div.children[3])
    expect(self).toStrictEqual(div.children[3])
    expect(index).toBe(4)
    expect(instance).toBeInstanceOf(Curry)
  })
})
