/**
 * @vitest-environment jsdom
 */

import { expect, test } from "vitest"
import { $ } from "../curry/index"
import { delay } from "../curry/util"

test("Hide  element with $.hide()", async () => {
  const div = document.createElement("div")
  div.style.display = "none"

  $(div).hide()
  await delay(5)
  expect(div).toHaveProperty("style.display", "none")
})

test("Show hidden element with $.show()", async () => {
  const div = document.createElement("div")
  div.style.display = "none"

  $(div).show()
  await delay(5)
  expect(div).toHaveProperty("style.display", "")
})

test("Toggle show/hide element with $.show()", async () => {
  const div = document.createElement("div")

  $(div).toggle()
  await delay(5)
  expect(div).toHaveProperty("style.display", "none")

  $(div).toggle()
  await delay(5)
  expect(div).toHaveProperty("style.display", "")
})
