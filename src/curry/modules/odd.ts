import { Curry } from ".."
import { IteratorCallback } from "../types"
import { toEl } from "../util"

export type Odd = (this: Curry, callback?: IteratorCallback) => Curry

/**
 *
 * @param this Curry instance
 * @param callback Function to call for each odd element
 * @returns Curry instance for optional chaining
 */

export const _odd: Odd = function (this, callback) {
  this.queue(() => {
    this.nodes = this.nodes.filter((_, index) => index % 2 !== 0)

    if (callback) {
      this.nodes.forEach((node, index) => {
        callback.apply(toEl(node), [
          {
            instance: this,
            self: toEl(node),
            index
          }
        ])
      })
    }
  })
  return this
}
