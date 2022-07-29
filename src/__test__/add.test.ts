/**
 * @vitest-environment jsdom
 */

import { describe, expect, test } from "vitest"
import { $ } from "../curry/index"
import { delay } from "../curry/util"

describe("Creating elements adjacent to the selected element", () => {
  test("Append a new element next to the wrapper", async () => {
    const wrapper = document.createElement("div")
    const h1 = document.createElement("span")
    wrapper.appendChild(h1)

    $(h1).add(document.createElement("a"))
    $(h1).add("<h2></h2>")

    await delay(10)

    expect(wrapper.children[0]).toStrictEqual(h1)
    expect(wrapper.children[1]).toBeInstanceOf(HTMLHeadingElement)
    expect(wrapper.children[2]).toBeInstanceOf(HTMLAnchorElement)
  })

  test("Preppend a new element before the wrapper", async () => {
    const wrapper = document.createElement("div")
    const h1 = document.createElement("span")
    wrapper.appendChild(h1)

    $(h1).add("<h2></h2>", "prepend")
    $(h1).add(document.createElement("a"), "prepend")

    await delay(10)

    expect(wrapper.children[0]).toBeInstanceOf(HTMLHeadingElement)
    expect(wrapper.children[1]).toBeInstanceOf(HTMLAnchorElement)
    expect(wrapper.children[2]).toStrictEqual(h1)
  })
})
