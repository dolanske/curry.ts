import { Curry } from ".."
import { GenericCallback } from "../types"
import { toEl } from "../util"

export type Even = (this: Curry, callback?: GenericCallback) => Curry

export const _even: Even = function (this, callback) {
  this.queue(() => {
    this.nodes = this.nodes.filter((_, index) => index % 2 !== 0)

    if (callback) {
      this.nodes.forEach((node) => {
        callback.apply(toEl(node), [
          {
            instance: this,
            self: toEl(node)
          }
        ])
      })
    }
  })

  return this
}
