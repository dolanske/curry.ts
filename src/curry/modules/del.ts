import { $, Curry } from ".."
import { toEl } from "../util"

export type Del = (this: Curry, selector?: string | string[]) => void

/**
 *
 * @param this Currt instance
 * @param selector Optionally filter nodes to remove
 */

export const _del: Del = function (this, selector) {
  this.queue(() => {
    this.nodes.forEach((node) => {
      const el = toEl(node)

      if (selector && !$(el).is(selector)) {
        return
      }

      el.remove()
    })
  })
}
