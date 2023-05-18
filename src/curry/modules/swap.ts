// Swaps positions of two matched elements

import type { Curry } from '..'
import { $ } from '..'
import { toEl } from '../util'

export type StaticSwap = (
  target: Element | Node | string,
  el: Element | Node | string,
  doc?: Document
) => void

/**
 *
 * @param target First element
 * @param el Second element
 * @returns Curry instance for chaining
 */

export const _staticSwap: StaticSwap = function (target, el, doc?: Document) {
  if (typeof target === 'string') {
    /* c8 ignore next 1 */
    const _target = (doc ?? document).querySelector(target)
    if (!_target)
      return
    target = _target
  }

  if (typeof el === 'string') {
    /* c8 ignore next 1 */
    const _el = (doc ?? document).querySelector(el)
    if (!_el)
      return
    el = _el
  }

  const _target = toEl<Node>(target).cloneNode(true)
  const _el = toEl<Node>(el).cloneNode(true)

  $(_target).replace(el)
  $(_el).replace(target)
}

export type Swap = (
  this: Curry,
  target: Element | Node | string,
  el?: Element | Node | string,
  doc?: Document
) => Curry

/**
 *
 * @param this Curry instance
 * @param target First element
 * @param el Second element
 * @returns Curry instance for chaining
 */

export const _swap: Swap = function (this, target, el) {
  this.queue(() => {
    // 1. If el is not provided, we swap the selected nodes with the target
    if (!el)
      _staticSwap(this.nodes[0], target, this.doc)

    // 2. We swap target with el
    else
      _staticSwap(target, el, this.doc)
  })

  return this
}
