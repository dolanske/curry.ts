import { Curry } from ".."
import { GenericCallback } from "../types"

export type NthChild = (
  this: Curry,
  index: number | number[],
  callback?: GenericCallback
) => Curry

export const _nthChild: NthChild = function (this, index, callback) {
  this.nodes.forEach((node) => {
    // const filtered =
  })

  return this
}
