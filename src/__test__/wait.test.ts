/**
 * @vitest-environment jsdom
 */

import { expect, test } from "vitest"
import { $ } from "../curry/index"
import { delay } from "../curry/util"

test("Pauses chain for 10ms", async () => {
  const span = document.createElement("span")

  $(span).wait(10).text("Hello")
  await delay(1)
  expect(span).toHaveProperty("textContent", "")
  await delay(11)
  expect(span).toHaveProperty("textContent", "Hello")
})
