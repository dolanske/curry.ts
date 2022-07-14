import { $, Curry } from ".."
import { toEl } from "../util"

export type Parent = (this: Curry, selector?: string) => Curry

/**
 *
 * @param this Curry instance
 * @param selector Filter parents by CSS selector
 * @returns Curry instance for optional chaining
 */

export const _parent: Parent = function (this, selector) {
  const parents: Set<Element> = new Set()

  for (const _node of this.nodes) {
    const node = toEl(_node)

    if (node.parentNode) {
      if (selector) {
        const child = toEl(node.parentNode)

        if ($(child).is(selector)) {
          parents.add(child)
        }
      } else {
        parents.add(toEl(node.parentNode))
      }
    }
  }

  this.nodes = Array.from(parents)

  return this
}
