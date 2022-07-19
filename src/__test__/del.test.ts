/**
 * @vitest-environment jsdom
 */

import { expect, test } from "vitest"
import { $ } from "../curry/index"
import { delay } from "../curry/util"

test("Remove html node using $.del()", async () => {
  const div = document.createElement("div")

  div.appendChild(document.createElement("span"))
  div.appendChild(document.createElement("h2"))

  $(div.children).del()

  await delay(1)

  expect(div.children).toHaveLength(0)
})
