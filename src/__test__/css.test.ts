/**
 * @vitest-environment jsdom
 */

import { expect, test } from "vitest"
import { $ } from "../curry/index"
import { delay } from "../curry/util"

test("Assign inline styles using $.css()", async () => {
  const div = document.createElement("div")

  $(div).css("color", "red")
  $(div).css("opacity", 50)

  await delay()

  expect(div).toHaveProperty("style.color", "red")
  expect(div).toHaveProperty("style.opacity", "50")
})

test("Assign inline style object using $.css()", async () => {
  const div = document.createElement("div")

  $(div).css({
    color: "red",
    opacity: 50
  })

  await delay()

  expect(div).toHaveProperty("style.color", "red")
  expect(div).toHaveProperty("style.opacity", "50")
})
