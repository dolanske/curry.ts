import type { Curry } from '..'
import type { GenericCallback } from '../types'
import { toEl } from '../util'

export type Last = (this: Curry, callback?: GenericCallback) => Curry

/**
 * Selects the flastirst node in the selected set
 *
 * @param this Curry instance
 * @param callback Function to call for selected node
 * @returns Curry instance for optional chaining
 */

export const _last: Last = function (this, callback) {
  this.queue(() => {
    const index = this.nodes.length
    this.nodes = [this.nodes[index - 1]]

    if (callback) {
      callback.apply(toEl(this.nodes[0]), [
        {
          self: toEl(this.nodes[0]),
          instance: this,
          index: index - 1,
        },
      ])
    }
  })

  return this
}
