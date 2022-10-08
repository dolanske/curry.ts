import { isArray, toEl } from '../util'
import type { Add, AddShorthand } from './add'

export const _addChild: Add = function (this, node, location = 'append') {
  this.queue(() => {
    if (!isArray(node))
      node = [node]

    for (const _parent of this.nodes) {
      const parent = toEl(_parent)
      for (const child of node) {
        // Inserting DOM elements
        if (child instanceof Element || child instanceof Node) {
          if (location === 'prepend')
            parent.insertBefore(child, parent.firstChild)
          else
            parent.appendChild(child)
        }

        // Inserting template string
        if (typeof child === 'string') {
          if (location === 'prepend')
            parent.insertAdjacentHTML('afterbegin', child)
          else
            parent.insertAdjacentHTML('beforeend', child)
        }
      }
    }
  })

  return this
}

/**
 * Shorthands for $.addChild()
 *
 * $.addChild('<element>', 'prepend')
 * $.addChild('<element>', 'append')
 */

export const _prependChild: AddShorthand = function (this, node) {
  _addChild.call(this, node, 'prepend')
  return this
}

export const _appendChild: AddShorthand = function (this, node) {
  _addChild.call(this, node, 'append')
  return this
}
