import type { Curry } from '..'
import type { GenericCallback } from '../types'
import { toEl } from '../util'

export type First = (this: Curry, callback?: GenericCallback) => Curry

/**
 * Selects the first node in the selected set
 *
 * @param this Curry instance
 * @param callback Function to call for selected node
 * @returns Curry instance for optional chaining
 */

export const _first: First = function (this, callback) {
  this.queue(() => {
    this.nodes = [this.nodes[0]]

    if (callback) {
      callback.apply(toEl(this.nodes[0]), [
        {
          self: toEl(this.nodes[0]),
          instance: this,
        },
      ])
    }
  })

  return this
}
