/**
 * @vitest-environment jsdom
 */

import { expect, test } from "vitest"
import { $, Curry } from "../curry/index"
import { delay } from "../curry/util"

test("Iterate over selected elements and execute a provided callback", async () => {
  const div = document.createElement("div")

  for (let i = 0; i < 3; i++) {
    const span = document.createElement("span")
    span.id = "span" + i
    div.appendChild(span)
  }

  $(div)
    .children()
    .each(function ({ self, index, instance }) {
      expect(self).toStrictEqual(div.children[index])
      expect(instance).toBeInstanceOf(Curry)
    })
})
