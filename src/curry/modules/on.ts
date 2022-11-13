import type { Curry } from '..'
import { toEl } from '../util'
import type { EventCallback } from '../types'

export type On = (
  this: Curry,
  eventName: string,
  callback: EventCallback,
  options?: {
    passive?: boolean
    once?: boolean
    capture?: boolean
  },
) => Curry

/**
 *
 * @param this Curry instance
 * @param eventName Event name
 * @param callback Executed when the event is triggered
 * @param options Event listener options
 * @returns Curry instance for optional chaining
 */

export const _on: On = function (this, eventName, callback, options) {
  this.queue(() => {
    for (const node of this.nodes) {
      node.addEventListener(
        eventName,
        event => callback.apply(toEl(node), [event, this]),
        options as unknown as EventListenerOptions,
      )
    }
  })

  return this
}
