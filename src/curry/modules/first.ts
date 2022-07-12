import { Curry } from ".."
import { GenericCallback } from "../types"
import { toEl } from "../util"

export type First = (this: Curry, callback?: GenericCallback) => Curry

/**
 * Selects the first node in the selected set
 *
 * @param this Curry instance
 * @param callback Function to call for selected node
 * @returns Curry instance
 */

export const _first: First = function (this, callback) {
  this.nodes = [this.nodes[0]]

  if (callback) {
    callback.apply(toEl(this.nodes[0]), [
      {
        self: toEl(this.nodes[0]),
        instance: this
      }
    ])
  }

  return this
}
