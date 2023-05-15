import type { Curry } from '..'
import { toEl } from '../util'

export type Get = <T = Element[] | Element | undefined>(
  this: Curry,
  key?: string
) => Promise<T>

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

export function _get(this: Curry): Promise<HTMLElement | HTMLElement[]>
export function _get(this: Curry, key?: string): Promise<any> {
  return this.queue(() => {
    if (this.nodes.length === 0)
      return undefined

    if (!key)
      return this.nodes.length === 1 ? this.nodes[0] : this.nodes

    const values: any[] = []

    for (const node of this.nodes) {
      if (node)
        values.push(Reflect.get(toEl<Element>(node), key))
    }

    return values.length === 1 ? values[0] : values
  })
}

// const _get: Get = function (this, key) {
//   return this.queue(() => {
//     if (this.nodes.length === 0)
//       return undefined

//     if (!key) {
//       return this.nodes.length === 1 ? this.nodes[0] : this.nodes
//     }

//     const values: any[] = []

//     for (const node of this.nodes) {
//       if (node)
//         values.push(Reflect.get(toEl<Element>(node), key))
//     }

//     return values.length === 1 ? values[0] : values
//   })
// }
