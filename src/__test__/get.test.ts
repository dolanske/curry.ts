/**
 * @vitest-environment jsdom
 */

import { expect, test } from "vitest"
import { $ } from "../curry/index"

test("Return nodes from current chain", async () => {
  const div = document.createElement("div")
  const returnDiv = await $(div).get()
  expect(returnDiv).toStrictEqual(div)

  const span1 = document.createElement("span")
  const span2 = document.createElement("span")

  div.appendChild(span1)
  div.appendChild(span2)

  const returnSpans = await $(div).children().get()

  expect(returnSpans).toStrictEqual([span1, span2])
})

test("Return specific Element propert", async () => {
  const div = document.createElement("div")
  div.id = "test"
  const returnDiv = await $(div).get("id")
  expect(returnDiv).toBe("test")
})
