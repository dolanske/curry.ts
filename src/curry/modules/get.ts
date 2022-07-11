import { Curry } from ".."

export type Get = {
  (this: Curry, key?: string): NodeList | any[]
}

/**
 *
 * @param this Curry instance.
 * @param key A property of the selected element(s).
 * @returns Selected nodes or an array of values matched by the key.
 */

export const _get: Get = function (this, key) {
  if (!key) return this.nodes

  const values: any[] = []

  this.nodes.forEach((node: Node) => {
    const el = node as Element
    if (node) {
      values.push(Reflect.get(el, key))
    }
  })

  return values
}
