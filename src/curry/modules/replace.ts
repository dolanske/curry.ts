// Replace elements with given element
import type { Curry } from '..'
import { createElement } from '../util'

export type Replace = (
  this: Curry,
  target: string | Element | Node,
  el?: string | Element | Node
) => Curry

export type StaticReplace = (
  target: string | Element | Node,
  el: string | Element | Node
) => void

/**
 *
 * @param target Target element to replace
 * @param el Element we replace with
 * @returns Curry instance
 */

export const _staticReplace: StaticReplace = function (target, el) {
  if (typeof target === 'string') {
    const _target = document.querySelector(target)
    if (!_target)
      return
    target = _target
  }

  if (typeof el === 'string') {
    if (el.startsWith('<') && el.endsWith('>')) {
      el = createElement(el)
    }
    else {
      const _el = document.querySelector(el)
      if (!_el)
        return
      el = _el
    }
  }

  if (el && target)
    target.parentNode?.replaceChild(el, target)
}

/**
 *
 * @param this Curry instance
 * @param target Target element to replace
 * @param el Element we replace with
 * @returns Curry instance
 */

export const _replace: Replace = function (this, target, el) {
  this.queue(() => _staticReplace(target, el ?? this.nodes[0]))
  return this
}
