/**
 * @vitest-environment jsdom
 */

import { describe, expect, test } from "vitest"
import { $ } from "../curry/index"
import { delay } from "../curry/util"

describe("Adding element child nodes", () => {
  test("Create new child elements using $.addChild()", async () => {
    const wrapper = document.createElement("div")
    wrapper.appendChild(document.createElement("span"))

    $(wrapper).addChild("<h2></h2>", "prepend")
    $(wrapper).addChild(document.createElement("a"), "append")

    await delay(10)

    expect(wrapper.children[0]).toBeInstanceOf(HTMLHeadingElement)
    expect(wrapper.children[1]).toBeInstanceOf(HTMLSpanElement)
    expect(wrapper.children[2]).toBeInstanceOf(HTMLAnchorElement)
  })

  test("Create new child elements using $.appendChild and $.prependChild shorthands", async () => {
    const wrapper = document.createElement("div")
    wrapper.appendChild(document.createElement("span"))

    $(wrapper).prependChild(document.createElement("a"))
    $(wrapper).appendChild("<h2></h2>")

    await delay(10)

    expect(wrapper.children[0]).toBeInstanceOf(HTMLAnchorElement)
    expect(wrapper.children[1]).toBeInstanceOf(HTMLSpanElement)
    expect(wrapper.children[2]).toBeInstanceOf(HTMLHeadingElement)
  })
})
