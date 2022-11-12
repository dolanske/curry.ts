import type { Curry } from '..'
import type { IteratorCallback } from '../types'
import { toEl } from '../util'

export type Each = (this: Curry, callback: IteratorCallback) => Curry

/**
 *
 * @param this Curry instance
 * @param callback Function to call for each node
 * @returns Curry instance for optional chaining
 */
export const _each: Each = function (this, callback) {
  this.queue(() => {
    this.nodes.forEach((node, index) => {
      callback.apply(toEl(node), [
        {
          index,
          self: toEl(node),
          instance: this,
        },
      ])
    })
  })

  return this
}
