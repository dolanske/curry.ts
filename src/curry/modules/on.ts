import type { Curry } from '..'
import type { EventCallback } from '../types'
import { toEl } from '../util'

export type On = (
  this: Curry,
  eventName: string,
  callback?: EventCallback,
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
  this.queue(async () => {
    const executions: Promise<any>[] = []

    for (const node of this.nodes) {
      executions.push(new Promise((resolve) => {
        node.addEventListener(
          eventName,
          (event) => {
            resolve(true)
            if (callback)
              callback.apply(toEl(node), [event, this])
          },
          options as unknown as EventListenerOptions,
        )
      }))
    }

    return Promise.allSettled(executions)
  })

  return this
}
