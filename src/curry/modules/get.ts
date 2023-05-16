import type { Curry } from '..'
import { toEl } from '../util'

export type Get = (
  this: Curry,
  key?: string
) => Promise<typeof key extends string ? string : Element[]>

/**
 *
 * Because chains can be async, if you want to await until a chain is finished, simply
 * append `.get()` at the end of it and `await` the entire chain. For example: `await $('#el').asyncEach().get()`
 *
 * @param this Curry instance
 * @param key A property of the selected element(s)
 * @returns Selected nodes or an array of values matched by the key
 *
 */

export function _get(this: Curry): Promise<Element[]>
export function _get(this: Curry, key?: string): Promise<any> {
  return this.queue(() => {
    if (this.nodes.length === 0)
      return undefined

    if (!key)
      return this.nodes

    const values: any[] = []

    for (const node of this.nodes) {
      if (node)
        values.push(Reflect.get(toEl<Element>(node), key))
    }

    return values.length === 1 ? values[0] : values
  })
}
