/**
 * @vitest-environment jsdom
 */

import { expect, test } from "vitest"
import { $ } from "../curry/index"
import { delay } from "../curry/util"

test("Teleport selected element to target", async () => {
  const wrap1 = document.createElement("div")
  wrap1.id = "wrap1"
  const wrap2 = document.createElement("div")
  wrap2.id = "wrap2"
  const span = document.createElement("span")
  span.id = "el"
  wrap1.appendChild(span)

  $(wrap1).children().teleport(wrap2)
  await delay(10)
  expect(wrap2.children[0]).toStrictEqual(span)

  $(wrap2).children().teleport("#iIdontExist")
  expect(wrap2.children[0]).toStrictEqual(span)
})
