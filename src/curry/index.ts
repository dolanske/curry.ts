// import type { DynamicObject } from './types'

import type { Text } from './modules/text'
import { _text } from './modules/text'
import type { Get } from './modules/get'
import { _get } from './modules/get'
import type { Is } from './modules/is'
import { _is } from './modules/is'
import type { On } from './modules/on'
import { _on } from './modules/on'
import type { Click } from './modules/click'
import { _click } from './modules/click'
import type { Del } from './modules/del'
import { _del } from './modules/del'
import type { CSS } from './modules/css'
import { _css } from './modules/css'
import type {
  ClassCheck,
  ClassManipulation,
} from './modules/class'
import {
  _addClass,
  _delClass,
  _hasClass,
  _tglClass,
} from './modules/class'
import type { Each } from './modules/each'
import { _each } from './modules/each'
import type { AsyncEach } from './modules/asyncEach'
import { _asyncEach } from './modules/asyncEach'
import type { Nth } from './modules/nth'
import { _nth } from './modules/nth'
import type { First } from './modules/first'
import { _first } from './modules/first'
import type { Last } from './modules/last'
import { _last } from './modules/last'
import type { Odd } from './modules/odd'
import { _odd } from './modules/odd'
import type { Even } from './modules/even'
import { _even } from './modules/even'
import type { Next } from './modules/next'
import { _next } from './modules/next'
import { _prev } from './modules/prev'
import type { Children } from './modules/children'
import { _children } from './modules/children'
import type { Visibility } from './modules/visibility'
import { _hide, _show, _toggle } from './modules/visibility'
import type { GetAttr, SetAttr } from './modules/attr'
import { _getAttr, _setAttr } from './modules/attr'
import type { Filter } from './modules/filter'
import { _filter } from './modules/filter'
import type { Teleport } from './modules/teleport'
import { _teleport } from './modules/teleport'
import type { Hover } from './modules/hover'
import { _hover } from './modules/hover'
import type { Parent } from './modules/parent'
import { _parent } from './modules/parent'
import type { Wait } from './modules/wait'
import { _wait } from './modules/wait'
import type {
  Replace,
  StaticReplace,
} from './modules/replace'
import {
  _replace,
  _staticReplace,
} from './modules/replace'
import type { StaticSwap, Swap } from './modules/swap'
import { _staticSwap, _swap } from './modules/swap'
import type { NthChild } from './modules/nthChild'
import { _nthChild } from './modules/nthChild'
import type { Add, AddShorthand } from './modules/add'
import { _add, _append, _prepend } from './modules/add'
import { _addChild, _appendChild, _prependChild } from './modules/addChild'
import { Key } from './modules/key'
import type { Trigger } from './modules/trigger'
import { _trigger } from './modules/trigger'
import type { Animate } from './modules/animate'
import { _animate } from './modules/animate'
import { _fullscreen, _staticFullscreen } from './modules/_fullscreen'
import type { Fullscreen, StaticFullscreen } from './modules/_fullscreen'
import { _fadeIn, _fadeOut, _fadeToggle } from './modules/_fade'
import type {Fade, FadeToggle} from "./modules/_fade"

export interface Curry {
  nodes: Node[]
  taskQueue: Promise<any>

  addClass: ClassManipulation
  delClass: ClassManipulation
  tglClass: ClassManipulation
  prependChild: AddShorthand
  appendChild: AddShorthand
  fullscreen: Fullscreen
  fadeToggle: FadeToggle
  prepend: AddShorthand
  prened: AddShorthand
  hasClass: ClassCheck
  asyncEach: AsyncEach
  children: Children
  teleport: Teleport
  toggle: Visibility
  nthChild: NthChild
  animate: Animate
  replace: Replace
  trigger: Trigger
  show: Visibility
  hide: Visibility
  setAttr: SetAttr
  getAttr: GetAttr
  addChild: Add
  parent: Parent
  filter: Filter
  fadeOut: Fade,
  fadeIn: Fade,
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
  key: Key
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
      if (typeof selector === 'string') {
        const nodes = document.querySelectorAll(selector)
        return Array.from(nodes)
      }

      if (selector instanceof HTMLCollection)
        return Array.from(selector)

      if (selector instanceof Node)
        return [selector]

      if (selector instanceof Curry)
        return selector.nodes

      return selector
    })()

    this.taskQueue = Promise.resolve()
  }

  /* ----------  Chaining API  ---------- */
  fullscreen: Fullscreen = _fullscreen.bind(this)
  prependChild = _prependChild.bind(this)
  appendChild = _appendChild.bind(this)
  fadeToggle = _fadeToggle.bind(this)
  asyncEach = _asyncEach.bind(this)
  addClass = _addClass.bind(this)
  delClass = _delClass.bind(this)
  tglClass = _tglClass.bind(this)
  children = _children.bind(this)
  hasClass = _hasClass.bind(this)
  teleport = _teleport.bind(this)
  nthChild = _nthChild.bind(this)
  addChild = _addChild.bind(this)
  prepend = _prepend.bind(this)
  setAttr = _setAttr.bind(this)
  getAttr = _getAttr.bind(this)
  replace = _replace.bind(this)
  trigger = _trigger.bind(this)
  animate = _animate.bind(this)
  fadeOut = _fadeOut.bind(this)
  filter = _filter.bind(this)
  fadeIn = _fadeIn.bind(this)
  append = _append.bind(this)
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
  key = new Key(this)
  is = _is.bind(this)
  on = _on.bind(this)

  /**
   * Functions which return Curry instance can be queued to be asyncronously executed.
   */

  async queue<T = void>(fn: () => T) {
    return await (this.taskQueue = this.taskQueue.then(fn))
  }

  /* ----------  Static API  ---------- */

  static fullscreen: StaticFullscreen = _staticFullscreen
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

// TODO: Implement actual reactive global state
// export const $state: DynamicObject = {}
