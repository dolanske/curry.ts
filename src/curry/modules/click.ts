import type { Curry } from '..'
import { $ } from '..'
import type { EventCallback } from '../types'
import { toEl } from '../util'

export type Click = (this: Curry, callback: EventCallback) => Curry

/**
 *
 * @param this Curry instance
 * @param callback Function executed when the event is triggered
 * @returns Curry instance for optional chaining
 */

export const _click: Click = function (this, callback) {
  // Save this in case a scope changes within a function
  // const that = this

  for (const node of this.nodes) {
    $(node).on('click', (event) => {
      callback.apply(toEl<Element>(node), [event, this])
    })
  }

  return this
}
