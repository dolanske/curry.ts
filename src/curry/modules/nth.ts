import { Curry } from ".."
import { GenericCallback } from "../types"
import { toEl } from "../util"

export type Nth = (
  this: Curry,
  index: number | number[],
  callback?: GenericCallback
) => Curry

/**
 * Allows selection of a node or an array of nodes by the provided index(es)
 *
 * @param this Curry instance
 * @param index Selects the node by index
 * @param callback Function to call for selected node
 * @returns Curry instance for optional chaining
 */

export const _nth: Nth = function (this, index, callback) {
  this.queue(() => {
    let newNodes: Element[] = []

    // Convert to array if it's not
    if (typeof index === "number") index = [index]

    // for (const node of this.nodes) {
    for (let i = 1; i <= this.nodes.length; i++) {
      if (index.includes(i)) {
        newNodes.push(toEl(this.nodes[i - 1]))
      }
    }

    this.nodes = newNodes

    if (callback) {
      this.nodes.forEach((node, i) => {
        callback.apply(toEl(node), [
          {
            instance: this,
            self: toEl(node),
            index: Array.isArray(index) ? index[i] : index
          }
        ])
      })
    }
  })

  return this
}
