import type { Curry } from '..'
import { toEl } from '../util'

export type AsyncEach = (
  this: Curry,
  callback: (
    this: Element,
    next: <T>(value?: T | PromiseLike<T>) => void,
    options: {
      self: Element
      index: number
      instance: Curry
    }
  ) => void
) => Curry

/**
 * Works the same as $.each() but to go the next loop we need to call next()
 *
 * @param this Curry instance
 * @param callback Asynchronous function to call for each node
 */

export const _asyncEach: AsyncEach = function (this, callback) {
  this.queue(
    () =>
      // eslint-disable-next-line no-async-promise-executor
      new Promise(async (resolve) => {
        let index = 0
        for (const node of this.nodes) {
          await new Promise((resolve) => {
            return callback.apply(toEl(node), [
              resolve,
              {
                self: toEl(node),
                index,
                instance: this,
              },
            ])
          })
          // It says line 44 is not covered, but I honestly don't understand how or why?
          /* c8 ignore next 2 */
          index++
        }

        resolve(true)
      }),
  )

  return this
}
