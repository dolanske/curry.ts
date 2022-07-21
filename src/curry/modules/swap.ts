// Swaps positions of two matched elements

import { $, Curry } from ".."
import { toEl } from "../util"

export type Swap = (
  this: Curry,
  target: Element | Node | string,
  el: Element | Node | string
) => Curry

// TODO: make el optional, if omitted, swap this.nodes[0] with target

export const _swap: Swap = function (this, target, el) {
  this.queue(() => _staticSwap(target, el))
  return this
}

export type StaticSwap = (
  target: Element | Node | string,
  el: Element | Node | string
) => void

export const _staticSwap: StaticSwap = function (target, el) {
  if (typeof target === "string") {
    const _target = document.querySelector(target)
    if (!_target) return
    target = _target
  }

  if (typeof el === "string") {
    const _el = document.querySelector(el)
    if (!_el) return
    el = _el
  }

  const _target = toEl<Node>(target).cloneNode(true)
  const _el = toEl<Node>(el).cloneNode(true)

  $(_target).replace(el)
  $(_el).replace(target)
}
