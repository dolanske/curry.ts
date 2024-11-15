import type { Add, AddShorthand } from './modules/add'
import type { Animate } from './modules/animate'
import type { AsyncEach } from './modules/asyncEach'
import type { GetAttr, SetAttr } from './modules/attr'
import type { Children } from './modules/children'
import type { ClassCheck, ClassManipulation } from './modules/class'
import type { Click } from './modules/click'
import type { CSS } from './modules/css'
import type { Del } from './modules/del'
import type { Each } from './modules/each'
import type { Even } from './modules/even'
import type { Fade, FadeToggle } from './modules/fade'
import type { Filter } from './modules/filter'
import type { First } from './modules/first'
import type { Fullscreen } from './modules/fullscreen'
import type { Get } from './modules/get'
import type { Hover } from './modules/hover'
import type { Is } from './modules/is'
import type { Last } from './modules/last'
import type { Next } from './modules/next'
import type { Nth } from './modules/nth'
import type { NthChild } from './modules/nthChild'
import type { Odd } from './modules/odd'
import type { On } from './modules/on'
import type { OnIntersect, StopOnIntersect } from './modules/onIntersect'
import type {
  OnMutate,
  StopOnMutate,
} from './modules/onMutate'
import type {
  OnResize,
  StopOnResize,
} from './modules/onResize'
import type { Parent } from './modules/parent'
import type { Query } from './modules/query'
import type { Replace } from './modules/replace'
import type { Run } from './modules/run'
import type { Siblings } from './modules/siblings'
import type { Slide, SlideToggle } from './modules/slide'
import type { State } from './modules/state'
import type { Swap } from './modules/swap'
import type { Teleport } from './modules/teleport'
import type { Text } from './modules/text'
import type { Trigger } from './modules/trigger'
import type { Visibility } from './modules/visibility'
import type { Wait } from './modules/wait'
import { _add, _append, _prepend } from './modules/add'
import { _addChild, _appendChild, _prependChild } from './modules/addChild'
import { _animate } from './modules/animate'
import { _asyncEach } from './modules/asyncEach'
import { _getAttr, _setAttr } from './modules/attr'
import { _children } from './modules/children'
import { _addClass, _delClass, _hasClass, _toggleClass } from './modules/class'
import { _click } from './modules/click'
import { _css } from './modules/css'
import { _del } from './modules/del'
import { _each } from './modules/each'
import { _even } from './modules/even'
import { _fadeIn, _fadeOut, _fadeToggle } from './modules/fade'
import { _filter } from './modules/filter'
import { _first } from './modules/first'
import { _fullscreen } from './modules/fullscreen'
import { _get } from './modules/get'
import { _hover } from './modules/hover'
import { _is } from './modules/is'
import { Key } from './modules/key'
import { _last } from './modules/last'
import { _next } from './modules/next'
import { _nth } from './modules/nth'
import { _nthChild } from './modules/nthChild'
import { _odd } from './modules/odd'
import { _on } from './modules/on'
import { _onIntersect, _stopOnIntersect } from './modules/onIntersect'
import {
  _onMutate,
  _stopOnMutate,
} from './modules/onMutate'
import {
  _onResize,
  _stopOnResize,
} from './modules/onResize'
import { _parent } from './modules/parent'
import { _prev } from './modules/prev'
import { _query } from './modules/query'
import { _replace } from './modules/replace'
import { _run } from './modules/run'
import { _nextSiblings, _prevSiblings, _siblings } from './modules/siblings'
import { _slideDown, _slideToggle, _slideUp } from './modules/slide'
import { _state } from './modules/state'
import { _swap } from './modules/swap'
import { _teleport } from './modules/teleport'
import { _text } from './modules/text'
import { _trigger } from './modules/trigger'
import { _hide, _show, _toggle } from './modules/visibility'
import { _wait } from './modules/wait'
import { queryDom } from './util'

// TODO: every method using document.querySelector should be able to substitude a different dom selector
// from the `this.doc` variable. Meaning we can scope down DOM searching

export type Selector = string | Node | Node[] | HTMLCollection | Curry
type CurryChainCompletion = boolean

export function $(selector: Selector, doc?: Document) {
  return new Curry(selector, doc)
}

export class Curry {
  doc?: Document
  nodes: Node[]
  taskQueue: Promise<any>

  constructor(selector: Selector, doc?: Document) {
    this.doc = doc
    this.nodes = queryDom(selector, doc)
    this.taskQueue = Promise.resolve()
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
  siblings: Siblings = _siblings.bind(this)
  prevSiblings: Siblings = _prevSiblings.bind(this)
  nextSiblings: Siblings = _nextSiblings.bind(this)
  onMutate: OnMutate = _onMutate.bind(this)
  stopOnMutate: StopOnMutate = _stopOnMutate.bind(this)
  onResize: OnResize = _onResize.bind(this)
  stopOnResize: StopOnResize = _stopOnResize.bind(this)
  onIntersect: OnIntersect = _onIntersect.bind(this)
  stopOnIntersect: StopOnIntersect = _stopOnIntersect.bind(this)

  // Reactive state
  state: State = _state.bind(this)

  /**
   * Functions which return Curry instance can be queued to be asyncronously executed.
   */

  async queue<T = void>(fn: () => T) {
    return await (this.taskQueue = this.taskQueue.then(fn))
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

  /**
   *  Experimental extension API
   *  Expose prototype so that users can extend curry with their own functions
   */

  static $fn(name: string, fn: (this: Curry) => void) {
    Object.defineProperty(Curry.prototype, name, {
      value(this: Curry) {
        fn.apply(this)
        return this
      },
    })
  }
}
