import { Curry } from ".."
import { toEl } from "../util"

export type Del = (this: Curry) => void

/**
 *
 * @param this Curry instance
 */

// TODO add selector

export const _del: Del = function (this) {
  this.queue(() => {
    this.nodes.forEach((node: Node) => {
      const el = toEl(node)
      el.remove()
    })
  })
}
