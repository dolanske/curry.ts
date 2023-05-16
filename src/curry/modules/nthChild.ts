import type { Curry } from '..'
import { $ } from '..'
import type { GenericCallback } from '../types'

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
              collected.push(...el)

              if (callback) {
                el.map((oneEl, i) =>
                  callback.apply(oneEl, [
                    {
                      self: oneEl,
                      instance: this,
                      index: Array.isArray(index) ? index[i] : index,
                    },
                  ]),
                )
              }
            }
          }),
        ).then(() => {
          this.nodes = collected
          resolve(true)
        })
      }),
  )

  return this
}
