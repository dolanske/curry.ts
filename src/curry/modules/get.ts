import { Curry } from ".."
import { toEl } from "../util"

export type Get = (this: Curry, key?: string) => Element[]

/**
 *
 * @param this Curry instance
 * @param key A property of the selected element(s)
 * @returns Selected nodes or an array of values matched by the key
 */

export const _get: Get = function (this, key) {
  if (!key) return this.nodes

  const values: any[] = []

  this.nodes.forEach((node: Node) => {
    if (node) {
      values.push(Reflect.get(toEl<Element>(node), key))
    }
  })

  return values.length === 1 ? values[0] : values
}
