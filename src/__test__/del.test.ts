/**
 * @vitest-environment jsdom
 */

import { expect, test } from "vitest"
import { $ } from "../curry/index"

test("Remove html node using $.del()", () => {
  const div = document.createElement("div")

  div.appendChild(document.createElement("span"))
  div.appendChild(document.createElement("h2"))

  $(div.children).del()
  expect(div.children).toHaveLength(0)
})
