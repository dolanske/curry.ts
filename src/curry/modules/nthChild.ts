import { Curry, $ } from ".."
import { GenericCallback } from "../types"

export type NthChild = (
  this: Curry,
  index: number | number[],
  callback?: GenericCallback
) => Curry

export const _nthChild: NthChild = function (this, index, callback) {
  this.queue(
    () =>
      new Promise((resolve) => {
        const collected: Element[] = []

        Promise.all(
          this.nodes.map(async (node) => {
            const el = await $(node).children().nth(index).get()

            if (el) {
              collected.push(...(Array.isArray(el) ? el : [el]))

              if (callback) {
                //FIXME: Execute callback for each child
                callback.apply(el, [{ self: el, instance: this }])
              }
            }
          })
        ).then(() => {
          this.nodes = collected
          resolve(true)
        })
      })
  )

  return this
}
