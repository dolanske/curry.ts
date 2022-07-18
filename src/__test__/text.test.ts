/**
 * @vitest-environment jsdom
 */

import { expect, test } from "vitest"
import { $ } from "../curry/index"

test("Replace text using $.text()", () => {
  const el = document.createElement("span")
  $(el).text("Hello")
  expect(el).toHaveProperty("textContent", "Hello")
})

test("Append text using $.text()", () => {
  // Replace
  const el = document.createElement("span")
  $(el).text("Hello")
  $(el).text(" World", "append")
  expect(el).toHaveProperty("textContent", "Hello World")
})

test("Prepend text using $.text()", () => {
  const el = document.createElement("span")
  $(el).text("Hello")
  $(el).text("World ", "prepend")
  expect(el).toHaveProperty("textContent", "World Hello")
})
