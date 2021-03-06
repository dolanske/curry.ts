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
import { _wait, Wait } from "./modules/wait"
import {
  _replace,
  Replace,
  _staticReplace,
  StaticReplace
} from "./modules/replace"
import { _swap, Swap, _staticSwap, StaticSwap } from "./modules/swap"
import { _nthChild, NthChild } from "./modules/nthChild"
import { _add, Add } from "./modules/add"
import { _addChild } from "./modules/addChild"

export interface Curry {
  nodes: Node[]
  taskQueue: Promise<any>

  addClass: ClassManipulation
  delClass: ClassManipulation
  tglClass: ClassManipulation
  hasClass: ClassCheck
  asyncEach: AsyncEach
  children: Children
  teleport: Teleport
  toggle: Visibility
  nthChild: NthChild
  replace: Replace
  show: Visibility
  hide: Visibility
  setAttr: SetAttr
  getAttr: GetAttr
  addChild: Add
  parent: Parent
  filter: Filter
  click: Click
  first: First
  hover: Hover
  wait: Wait
  swap: Swap
  even: Even
  next: Next
  prev: Next
  last: Last
  each: Each
  text: Text
  add: Add
  odd: Odd
  css: CSS
  del: Del
  get: Get
  nth: Nth
  is: Is
  on: On
}

type Selector = string | Node | Node[] | HTMLCollection | Curry

export function $(selector: Selector) {
  const instance = new Curry(selector)
  return instance
}

export class Curry implements Curry {
  constructor(selector: Selector) {
    this.nodes = (() => {
      if (typeof selector === "string") {
        const nodes = document.querySelectorAll(selector)
        return Array.from(nodes)
      }

      if (selector instanceof HTMLCollection) {
        return Array.from(selector)
      }

      if (selector instanceof Node) return [selector]

      if (selector instanceof Curry) return this.nodes

      return selector
    })()

    this.taskQueue = Promise.resolve()
  }

  /**
   * Functions which return Curry instance can be queued to be asyncronously executed.
   *
   *
   */

  async queue<T = void>(fn: () => T) {
    return await (this.taskQueue = this.taskQueue.then(fn))
  }

  /*----------  Chaining API  ----------*/
  asyncEach = _asyncEach.bind(this)
  addClass = _addClass.bind(this)
  delClass = _delClass.bind(this)
  tglClass = _tglClass.bind(this)
  children = _children.bind(this)
  hasClass = _hasClass.bind(this)
  teleport = _teleport.bind(this)
  nthChild = _nthChild.bind(this)
  addChild = _addChild.bind(this)
  setAttr = _setAttr.bind(this)
  getAttr = _getAttr.bind(this)
  replace = _replace.bind(this)
  filter = _filter.bind(this)
  toggle = _toggle.bind(this)
  parent = _parent.bind(this)
  click = _click.bind(this)
  first = _first.bind(this)
  hover = _hover.bind(this)
  wait = _wait.bind(this)
  swap = _swap.bind(this)
  show = _show.bind(this)
  hide = _hide.bind(this)
  text = _text.bind(this)
  each = _each.bind(this)
  last = _last.bind(this)
  even = _even.bind(this)
  next = _next.bind(this)
  prev = _prev.bind(this)
  add = _add.bind(this)
  del = _del.bind(this)
  odd = _odd.bind(this)
  get = _get.bind(this) as Get
  css = _css.bind(this)
  nth = _nth.bind(this)
  is = _is.bind(this)
  on = _on.bind(this)

  /*----------  Static API  ----------*/

  static replace: StaticReplace = _staticReplace
  static swap: StaticSwap = _staticSwap
  static text(el: Selector, text: string | number) {
    const instance = $(el)
    return _text.bind(instance)(text)
  }

  get length() {
    return this.nodes.length
  }
}

export const $state: DynamicObject = {}
