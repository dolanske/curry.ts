import type { Curry } from '..'
import { $ } from '..'
import type { EventCallback } from '../types'
import { toEl } from '../util'

export type Click = (this: Curry, callback?: EventCallback) => Curry

/**
 *
 * @param this Curry instance
 * @param callback Function executed when the event is triggered
 * @returns Curry instance for optional chaining
 */

export const _click: Click = function (this, callback) {
  this.queue(async () => {
    const executions: Promise<any>[] = []

    for (const node of this.nodes) {
      executions.push(new Promise((resolve) => {
        $(node).on('click', (event) => {
          resolve(true)

          if (callback)
            callback.apply(toEl<HTMLElement>(node), [event, this])
        })
      }))
    }

    return Promise.allSettled(executions)
  })

  return this
}
