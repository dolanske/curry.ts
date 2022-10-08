import type { Curry } from '..'
import { $ } from '..'
import { toEl } from '../util'

export type Children = (this: Curry, selector?: string) => Curry

/**
 *
 * @param this Curry instance
 * @param selector Filter the children by CSS selector
 * @returns Curry instance for optional chaining
 */

export const _children: Children = function (this, selector) {
  this.queue(() => {
    const children: Element[] = []

    for (const _node of this.nodes) {
      const node = toEl(_node)

      if (node.children) {
        if (selector) {
          node.childNodes.forEach((_child) => {
            const child = toEl(_child)

            if ($(child).is(selector))
              children.push(child)
          })
        }
        else {
          children.push(...Array.from(node.children))
        }
      }
    }

    this.nodes = children
  })

  return this
}
