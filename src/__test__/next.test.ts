/**
 * @vitest-environment jsdom
 */

import { expect, test } from "vitest"
import { $ } from "../curry/index"

test("Selects the next node $.next()", () => {
  const div = document.createElement("div")

  const first = document.createElement("span")
  first.id = "first"

  const second = document.createElement("span")
  second.id = "second"

  div.appendChild(first)
  div.appendChild(second)

  const shouldBeSecond = $(first).next().get()

  expect(shouldBeSecond[0]).toBe(second)
  expect(shouldBeSecond[0]).not.toBe(first)

  const shouldNotExist = $(first).next().next().get()

  expect(shouldNotExist[0]).toBe(undefined)
})
