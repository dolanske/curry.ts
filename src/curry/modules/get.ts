import { Curry } from ".."
import { toEl } from "../util"

export type Get = (this: Curry, key?: string) => Promise<Element | Element>

/**
 *
 * @param this Curry instance
 * @param key A property of the selected element(s)
 * @returns Selected nodes or an array of values matched by the key
 */

export const _get: Get = function (this, key) {
  return this.queue(() => {
    if (!key) return this.nodes.length === 1 ? this.nodes[0] : this.nodes

    const values: any[] = []

    this.nodes.forEach((node: Node) => {
      if (node) {
        values.push(Reflect.get(toEl<Element>(node), key))
      }
    })

    return values.length === 1 ? values[0] : values
  })
}
