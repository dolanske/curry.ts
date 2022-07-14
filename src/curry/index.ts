import { DynamicObject } from "./types"

import { _text, Text } from "./modules/text"
import { _get, Get } from "./modules/get"
import { _is, Is } from "./modules/is"
import { _on, On } from "./modules/on"
import { _click, Click } from "./modules/click"
import { _del, Del } from "./modules/del"
import { _css, CSS } from "./modules/css"
import {
  _addClass,
  _delClass,
  _tglClass,
  _hasClass,
  ClassCheck,
  ClassManipulation
} from "./modules/class"
import { _each, Each } from "./modules/each"
import { _asyncEach, AsyncEach } from "./modules/asyncEach"
import { _nth, Nth } from "./modules/nth"
import { _first, First } from "./modules/first"
import { _last, Last } from "./modules/last"
import { _odd, Odd } from "./modules/odd"
import { _even, Even } from "./modules/even"
import { _next, Next } from "./modules/next"
import { _prev } from "./modules/prev"
import { _children, Children } from "./modules/children"
import { _show, _hide, _toggle, Visibility } from "./modules/visibility"
import { _setAttr, SetAttr, _getAttr, GetAttr } from "./modules/attr"
import { _filter, Filter } from "./modules/filter"
import { _teleport, Teleport } from "./modules/teleport"
import { _hover, Hover } from "./modules/hover"
import { _parent, Parent } from "./modules/parent"

export interface Curry {
  nodes: Node[]
  addClass: ClassManipulation
  delClass: ClassManipulation
  tglClass: ClassManipulation
  hasClass: ClassCheck
  asyncEach: AsyncEach
  children: Children
  teleport: Teleport
  toggle: Visibility
  show: Visibility
  hide: Visibility
  setAttr: SetAttr
  getAttr: GetAttr
  parent: Parent
  filter: Filter
  click: Click
  first: First
  hover: Hover
  even: Even
  next: Next
  prev: Next
  last: Last
  each: Each
  text: Text
  odd: Odd
  css: CSS
  del: Del
  get: Get
  nth: Nth
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

    // Curry methods
    this.asyncEach = _asyncEach.bind(this)
    this.addClass = _addClass.bind(this)
    this.delClass = _delClass.bind(this)
    this.tglClass = _tglClass.bind(this)
    this.children = _children.bind(this)
    this.hasClass = _hasClass.bind(this)
    this.teleport = _teleport.bind(this)
    this.setAttr = _setAttr.bind(this)
    this.getAttr = _getAttr.bind(this)
    this.filter = _filter.bind(this)
    this.toggle = _toggle.bind(this)
    this.parent = _parent.bind(this)
    this.click = _click.bind(this)
    this.first = _first.bind(this)
    this.hover = _hover.bind(this)
    this.show = _show.bind(this)
    this.hide = _hide.bind(this)
    this.text = _text.bind(this)
    this.each = _each.bind(this)
    this.last = _last.bind(this)
    this.even = _even.bind(this)
    this.next = _next.bind(this)
    this.prev = _prev.bind(this)
    this.del = _del.bind(this)
    this.odd = _odd.bind(this)
    this.get = _get.bind(this)
    this.css = _css.bind(this)
    this.nth = _nth.bind(this)
    this.is = _is.bind(this)
    this.on = _on.bind(this)
  }

  get length() {
    return this.nodes.length
  }
}

export const $state: DynamicObject = {}

// Webpack
if (typeof module === "object" && module.exports) {
  module.exports = $
  module.exports.$ = $
}
