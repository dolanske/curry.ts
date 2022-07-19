/**
 * @vitest-environment jsdom
 */

import { expect, test } from "vitest"
import { $ } from "../curry/index"
import { delay } from "../curry/util"

test("Selects the next node $.next()", async () => {
  const div = document.createElement("div")

  const first = document.createElement("span")
  first.id = "first"

  const second = document.createElement("span")
  second.id = "second"

  div.appendChild(first)
  div.appendChild(second)

  const shouldBeSecond = await $(first).next().get()

  // await delay(1)

  expect(shouldBeSecond[0]).toBe(second)
  expect(shouldBeSecond[0]).not.toBe(first)

  const shouldNotExist = await $(first).next().next().get()

  // await delay(1)

  expect(shouldNotExist[0]).toBe(undefined)
})
