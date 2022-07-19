/**
 * @vitest-environment jsdom
 */

import { expect, test } from "vitest"
import { $, Curry } from "../curry/index"
// import { delay } from "../curry/util"

test("Return the first matched element using $.first()", async () => {
  const div = document.createElement("div")
  const span1 = document.createElement("span")
  const span2 = document.createElement("span")
  span1.id = "first"
  span2.id = "second"
  div.appendChild(span1)
  div.appendChild(span2)

  const shouldBeFirst = await $(div.children).first().get()
  expect(shouldBeFirst).toStrictEqual(span1)
})

test("Apply correct callback parameters to $.first()", () => {
  const div = document.createElement("div")
  const span1 = document.createElement("span")
  const span2 = document.createElement("span")
  span1.id = "first"
  span2.id = "second"
  div.appendChild(span1)
  div.appendChild(span2)

  $(div.children).first(function ({ self, instance }) {
    expect(this).toStrictEqual(span1)
    expect(self).toStrictEqual(span1)
    expect(instance).toBeInstanceOf(Curry)
  })
})
