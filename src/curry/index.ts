import { DynamicObject } from "./types"

import { _text, Text } from "./modules/text"
import { _get, Get } from "./modules/get"
import { _is, Is } from "./modules/is"
import { _on, On } from "./modules/on"
import { _click, Click } from "./modules/click"

export interface Curry {
  nodes: Node[]
  $state: DynamicObject
  click: Click
  text: Text
  get: Get
  is: Is
  on: On
}

type Selector = string | Node | Node[]

export function $(selector: Selector) {
  const instance = new Curry(selector)
  return instance
}

export class Curry implements Curry {
  constructor(selector: Selector) {
    this.nodes = (() => {
      if (typeof selector === "string") {
        const nodes = document.querySelectorAll(selector)
        //@ts-ignore
        // I am unsure how to tell typescript that this will always work
        return [...nodes]
      }

      if (selector instanceof Node) return [selector]

      return selector
    })()
    this.$state = {}

    // Curry methods
    this.click = _click.bind(this)
    this.text = _text.bind(this)
    this.get = _get.bind(this)
    this.is = _is.bind(this)
    this.on = _on.bind(this)
  }

  get length() {
    return this.nodes.length
  }
}

// Webpack
if (typeof module === "object" && module.exports) {
  module.exports = $
  module.exports.$ = $
}
