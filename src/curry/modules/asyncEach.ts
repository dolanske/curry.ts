import { Curry } from ".."
import { toEl } from "../util"

export type AsyncEach = (
  this: Curry,
  callback: (
    this: Element,
    next: (value?: unknown) => void,
    options: {
      index: number
      instance: Curry
    }
  ) => void
) => void

/**
 * Works the same as $.each() but to go the next loop we need to call next()
 *
 * @param this Curry instance
 * @param callback Asynchronous function to call for each node
 */

export const _asyncEach: AsyncEach = async function (this, callback) {
  let index: number = 0

  for (const node of this.nodes) {
    await new Promise((resolve) => {
      return callback.apply(toEl(node), [
        resolve,
        {
          index,
          instance: this
        }
      ])
    })

    index++
  }
}
