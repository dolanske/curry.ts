/**
 * @vitest-environment jsdom
 */

import { expect, test } from "vitest"
import { $ } from "../curry/index"
import { delay } from "../curry/util"

test("Replace text using $.text()", async () => {
  const el = document.createElement("span")
  $(el).text("Hello")

  await delay(1)

  expect(el).toHaveProperty("textContent", "Hello")
})

test("Append text using $.text()", async () => {
  // Replace
  const el = document.createElement("span")
  $(el).text("Hello")
  $(el).text(" World", "append")

  await delay(1)

  expect(el).toHaveProperty("textContent", "Hello World")
})

test("Prepend text using $.text()", async () => {
  const el = document.createElement("span")
  $(el).text("Hello")
  $(el).text("World ", "prepend")

  await delay(1)

  expect(el).toHaveProperty("textContent", "World Hello")
})
