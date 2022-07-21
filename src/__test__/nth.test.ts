/**
 * @vitest-environment jsdom
 */

import { expect, test } from "vitest"
import { $, Curry } from "../curry/index"

test("Select element at provided index", async () => {
  const div = document.createElement("div")

  for (let i = 0; i < 5; i++) {
    const span = document.createElement("span")
    span.id = "span" + i
    div.appendChild(span)
  }

  const shouldBeFirst = await $(div).children().nth(1).get()
  const shouldBeThird = await $(div).children().nth(3).get()
  const shouldBeSecondAndFourth = await $(div).children().nth([2, 4]).get()

  expect(shouldBeFirst).toStrictEqual(div.children[0])
  expect(shouldBeThird).toStrictEqual(div.children[2])
  expect(shouldBeSecondAndFourth).toStrictEqual([
    div.children[1],
    div.children[3]
  ])
})

test("Select element at provided index with callback", async () => {
  const div = document.createElement("div")

  for (let i = 0; i < 5; i++) {
    const span = document.createElement("span")
    span.id = "span" + i
    div.appendChild(span)
  }

  $(div)
    .children()
    .nth([2, 3], function ({ self, index, instance }) {
      if (!index) {
        expect(index).toBe(undefined)
      } else if (index === 2) {
        expect(this).toStrictEqual(div.children[1])
        expect(self).toStrictEqual(div.children[1])
        expect(index).toStrictEqual(2)
      } else if (index === 3) {
        expect(this).toStrictEqual(div.children[2])
        expect(self).toStrictEqual(div.children[2])
        expect(index).toStrictEqual(3)
      }

      expect(instance).toBeInstanceOf(Curry)
    })
})
