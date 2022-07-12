import { Curry } from ".."
import { GenericCallback } from "../types"
import { toEl } from "../util"

export type Last = (this: Curry, callback?: GenericCallback) => Curry

/**
 * Selects the flastirst node in the selected set
 *
 * @param this Curry instance
 * @param callback Function to call for selected node
 * @returns Curry instance
 */

export const _last: Last = function (this, callback) {
  const index = this.nodes.length
  this.nodes = [this.nodes[index - 1]]

  if (callback) {
    callback.apply(toEl(this.nodes[index]), [
      {
        self: toEl(this.nodes[index]),
        instance: this,
        index: index - 1
      }
    ])
  }

  return this
}
