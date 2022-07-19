/**
 * @vitest-environment jsdom
 */

import { expect, test } from "vitest"
import { $ } from "../curry/index"
import { delay } from "../curry/util"

test("Select every odd element", async () => {
  const div = document.createElement("div")

  for (let i = 0; i < 4; i++) {
    const span = document.createElement("span")
    span.id = "span" + i
    div.appendChild(span)
  }

  const oddChildren = await $(div.children).odd().get()

  await delay(10)

  expect(oddChildren).toHaveLength(2)
  expect(oddChildren).toStrictEqual([div.children[1], div.children[3]])
})
