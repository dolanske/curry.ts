import type { Curry } from '..'
import { $ } from '..'
import { toEl } from '../util'

export type Siblings = (this: Curry, selector?: string) => Curry

/**
 *
 * Selects all elements sibling elements
 *
 * @param this Curry instance
 * @param selector Filter the siblings by CSS selector
 * @returns Curry instance for optional chaining
 */

export const _siblings: Siblings = function (this, selector) {
  this.queue(() => {
    const matches: Element[] = []

    for (const _node of this.nodes) {
      const node = toEl(_node)

      // Pick first sibling and check each node from left ---> right
      let sibling = node?.parentElement?.firstChild

      while (sibling) {
        // Make sure to ignore nodes which are not elements (text nodes etc)
        // And also ignore the current / selected node
        if (!sibling.isEqualNode(node) && sibling.nodeType === 1) {
          if ((selector && $(sibling).is(selector)) || !selector)
            matches.push(toEl(sibling))
        }

        // Pick next sibling and repeat loop
        sibling = sibling.nextSibling
      }
    }

    this.nodes = matches
  })

  return this
}

/**
 *
 * Selects all previous sibling elements
 *
 * @param this Curry instance
 * @param selector Filter the siblings by CSS selector
 * @returns Curry instance for optional chaining
 */

export const _prevSiblings: Siblings = function (this, selector) {
  this.queue(() => {
    const matches: Element[] = []

    for (const _node of this.nodes) {
      const node = toEl(_node)

      // Pick first sibling and check each node from left ---> right
      let sibling = node?.parentElement?.firstChild

      while (sibling) {
        // If current sibling is node, we abort because we have reached all the previous children
        if (sibling.isEqualNode(node))
          break

        // Make sure to ignore nodes which are not elements (text nodes etc)
        // And also ignore the current / selected node
        if (sibling.nodeType === 1) {
          if ((selector && $(sibling).is(selector)) || !selector)
            matches.push(toEl(sibling))
        }

        // Pick next sibling and repeat loop
        sibling = sibling.nextSibling
      }
    }

    this.nodes = matches
  })

  return this
}

/**
 *
 * Selects all sibling elements after current node
 *
 * @param this Curry instance
 * @param selector Filter the siblings by CSS selector
 * @returns Curry instance for optional chaining
 */

export const _nextSiblings: Siblings = function (this, selector) {
  this.queue(() => {
    const matches: Element[] = []

    for (const _node of this.nodes) {
      const node = toEl(_node)

      // Pick first sibling to the RIGHT of current node and check each node from left ---> right
      let sibling = node.nextSibling

      while (sibling) {
        // Make sure to ignore nodes which are not elements (text nodes etc)
        // And also ignore the current / selected node
        if (!sibling.isEqualNode(node) && sibling.nodeType === 1) {
          if ((selector && $(sibling).is(selector)) || !selector)
            matches.push(toEl(sibling))
        }

        // Pick next sibling and repeat loop
        sibling = sibling.nextSibling
      }
    }

    this.nodes = matches
  })

  return this
}
