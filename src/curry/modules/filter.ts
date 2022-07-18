import { $, Curry } from ".."
import { toEl, isArray } from "../util"
import { IteratorCallback } from "../types"

export type Filter = (
  this: Curry,
  condition: string | string[] | IteratorCallback<boolean>
) => Curry

/**
 * Takes in one ore multiple conditions and filters selected nodes based on the results
 *
 * @param this Curry instance
 * @param condition Condition to filter the nodes by
 * @returns Curry instance for optional chaining
 */

export const _filter: Filter = function (this, condition) {
  this.queue(() => {
    const matches: Element[] = []

    this.nodes.forEach((_node, index) => {
      const node = toEl(_node)

      if (isArray(condition) || typeof condition === "string") {
        if ($(node).is(condition)) matches.push(node)
      } else {
        const result = condition.apply(node, [index, this])

        if (result) matches.push(node)
      }
    })

    this.nodes = matches
  })

  return this
}
