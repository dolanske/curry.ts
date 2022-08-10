/**
 * @vitest-environment jsdom
 */

import { describe, expect, test } from "vitest"
import { $ } from "../curry/index"
import { delay } from "../curry/util"

describe("Creating elements adjacent to the selected element", () => {
  test("Append a new element next to the wrapper", async () => {
    const wrapper = document.createElement("div")
    const base = document.createElement("span")
    wrapper.appendChild(base)

    $(base).add(document.createElement("a"))
    $(base).add("<h2></h2>")

    await delay(10)

    expect(wrapper.children[0]).toStrictEqual(base)
    expect(wrapper.children[1]).toBeInstanceOf(HTMLHeadingElement)
    expect(wrapper.children[2]).toBeInstanceOf(HTMLAnchorElement)
  })

  test("Preppend a new element before the wrapper", async () => {
    const wrapper = document.createElement("div")
    const base = document.createElement("span")
    wrapper.appendChild(base)

    $(base).add("<h2></h2>", "prepend")
    $(base).add(document.createElement("a"), "prepend")

    await delay(10)

    expect(wrapper.children[0]).toBeInstanceOf(HTMLHeadingElement)
    expect(wrapper.children[1]).toBeInstanceOf(HTMLAnchorElement)
    expect(wrapper.children[2]).toStrictEqual(base)
  })

  test("Using $.prepend shorthand", async () => {
    const wrapper = document.createElement("div")
    const base = document.createElement("span")
    wrapper.appendChild(base)

    $(base).prepend("<h2></h2>")
    $(base).prepend(document.createElement("a"))

    await delay(10)

    expect(wrapper.children[0]).toBeInstanceOf(HTMLHeadingElement)
    expect(wrapper.children[1]).toBeInstanceOf(HTMLAnchorElement)
    expect(wrapper.children[2]).toStrictEqual(base)
  })

  test("sing $.append shorthand", async () => {
    const wrapper = document.createElement("div")
    const base = document.createElement("span")
    wrapper.appendChild(base)

    $(base).append(document.createElement("a"))
    $(base).append("<h2></h2>")

    await delay(10)

    expect(wrapper.children[0]).toStrictEqual(base)
    expect(wrapper.children[1]).toBeInstanceOf(HTMLHeadingElement)
    expect(wrapper.children[2]).toBeInstanceOf(HTMLAnchorElement)
  })
})
