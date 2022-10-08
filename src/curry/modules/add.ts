// append

import type { Curry } from '..'
import { isArray, toEl } from '../util'

type NewNode = Element | string | Node | Array<Element | string | Node>

export type Add = (
  this: Curry,
  node: NewNode,
  location?: 'prepend' | 'append'
) => Curry

export const _add: Add = function (this, node, location = 'append') {
  this.queue(() => {
    if (!isArray(node))
      node = [node]

    for (const _parent of this.nodes) {
      const parent = toEl(_parent)
      for (const child of node) {
        // Inserting DOM elements
        if (
          (child instanceof Element || child instanceof Node)
          && parent.parentNode
        ) {
          if (location === 'prepend')
            parent.parentNode.insertBefore(child, parent)
          else
            parent.parentNode.insertBefore(child, parent.nextSibling)
        }

        // Inserting template string
        if (typeof child === 'string') {
          if (location === 'prepend')
            parent.insertAdjacentHTML('beforebegin', child)
          else
            parent.insertAdjacentHTML('afterend', child)
        }
      }
    }
  })

  return this
}

/**
 * Shorthands for $.add()
 *
 * $.add('<element>', 'prepend')
 * $.add('<element>', 'append')
 */

export type AddShorthand = (this: Curry, node: NewNode) => Curry

export const _prepend: AddShorthand = function (this, node) {
  _add.call(this, node, 'prepend')
  return this
}

export const _append: AddShorthand = function (this, node) {
  _add.call(this, node, 'append')
  return this
}
