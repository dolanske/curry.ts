import { $, Curry } from ".."
import { EventCallback } from "../types"
import { toEl } from "../util"

export type Click = (this: Curry, callback: EventCallback) => Curry

/**
 *
 * @param this Curry instance.
 * @param callback Function executed when the event is triggered.
 * @returns Curry instance for optional chaining.
 */

export const _click: Click = function (this, callback) {
  // Save this in case a scope changes within a function
  const that = this

  this.nodes.forEach((node: Node) => {
    $(node).on("click", function (event) {
      callback.apply(toEl<Element>(node), [event, that])
    })
  })

  return this
}
