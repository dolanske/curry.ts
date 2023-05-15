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
import type { ClassCheck, ClassManipulation } from './modules/class'
import { _addClass, _delClass, _hasClass, _toggleClass } from './modules/class'
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
import type { Replace, StaticReplace } from './modules/replace'
import { _replace, _staticReplace } from './modules/replace'
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
import { _fullscreen, _staticFullscreen } from './modules/fullscreen'
import type { Fullscreen, StaticFullscreen } from './modules/fullscreen'
import { _fadeIn, _fadeOut, _fadeToggle } from './modules/fade'
import type { Fade, FadeToggle } from './modules/fade'
import type { Run } from './modules/run'
import { _run } from './modules/run'
import { queryDom } from './util'
import type { Query } from './modules/query'
import { _query } from './modules/query'
import { _slideDown, _slideToggle, _slideUp } from './modules/_slide'
import type { Slide, SlideToggle } from './modules/_slide'

// TODO: every method using document.querySelector should be able to substitude a different dom selector
// from the `this.doc` variable. Meaning we can scope down DOM searching

export type Selector = string | Node | Node[] | HTMLCollection | Curry
type CurryChainCompletion = boolean

export function $(selector: Selector, doc?: Document) {
  const instance = new Curry(selector, doc)
  return instance
}

export class Curry {
  doc?: Document
  nodes: Node[]
  taskQueue: Promise<any>
  taskRegistry: Promise<any>[]

  constructor(selector: Selector, doc?: Document) {
    this.doc = doc
    this.nodes = queryDom(selector, doc)
    this.taskQueue = Promise.resolve()
    this.taskRegistry = []
  }

  /* ----------  Chaining API  ---------- */
  fullscreen: Fullscreen = _fullscreen.bind(this)
  prependChild: AddShorthand = _prependChild.bind(this)
  toggleClass: ClassManipulation = _toggleClass.bind(this)
  appendChild: AddShorthand = _appendChild.bind(this)
  fadeToggle: FadeToggle = _fadeToggle.bind(this)
  asyncEach: AsyncEach = _asyncEach.bind(this)
  addClass: ClassManipulation = _addClass.bind(this)
  delClass: ClassManipulation = _delClass.bind(this)
  children: Children = _children.bind(this)
  hasClass: ClassCheck = _hasClass.bind(this)
  teleport: Teleport = _teleport.bind(this)
  nthChild: NthChild = _nthChild.bind(this)
  addChild: Add = _addChild.bind(this)
  prepend: AddShorthand = _prepend.bind(this)
  setAttr: SetAttr = _setAttr.bind(this)
  getAttr: GetAttr = _getAttr.bind(this)
  replace: Replace = _replace.bind(this)
  trigger: Trigger = _trigger.bind(this)
  animate: Animate = _animate.bind(this)
  fadeOut: Fade = _fadeOut.bind(this)
  filter: Filter = _filter.bind(this)
  fadeIn: Fade = _fadeIn.bind(this)
  append: AddShorthand = _append.bind(this)
  toggle: Visibility = _toggle.bind(this)
  parent: Parent = _parent.bind(this)
  click: Click = _click.bind(this)
  first: First = _first.bind(this)
  hover: Hover = _hover.bind(this)
  wait: Wait = _wait.bind(this)
  swap: Swap = _swap.bind(this)
  show: Visibility = _show.bind(this)
  hide: Visibility = _hide.bind(this)
  query: Query = _query.bind(this)
  text: Text = _text.bind(this)
  each: Each = _each.bind(this)
  last: Last = _last.bind(this)
  even: Even = _even.bind(this)
  next: Next = _next.bind(this)
  prev: Next = _prev.bind(this)
  add: Add = _add.bind(this)
  del: Del = _del.bind(this)
  odd: Odd = _odd.bind(this)
  get: Get = _get.bind(this) as Get
  css: CSS = _css.bind(this)
  nth: Nth = _nth.bind(this)
  run: Run = _run.bind(this)
  key: Key = new Key(this)
  is: Is = _is.bind(this)
  on: On = _on.bind(this)

  slideUp: Slide = _slideUp.bind(this)
  slideDown: Slide = _slideDown.bind(this)
  slideToggle: SlideToggle = _slideToggle.bind(this)

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

  get await(): Promise<CurryChainCompletion> {
    return new Promise<CurryChainCompletion>((resolve) => {
      return this.queue(() => {
        resolve(true)
      })
    })
  }

  // Expose prototype so that users can extend curry with their own functions
  /**
   *  Experimental extension API
   */

  static $fn(name: string, fn: (this: Curry) => void) {
    Object.defineProperty(
      Curry.prototype,
      name,
      {
        value(this: Curry) {
          fn.apply(this)
          return this
        },
      },
    )
  }
}
