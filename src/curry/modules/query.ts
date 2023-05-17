import type { Curry, Selector } from '..'
import { queryDom } from '../util'

export type Query = (
  this: Curry,
  selector: Selector,
  append?: boolean
) => Curry

/**
 * Functions the same as $(SELECTOR) but within a chain. Meaning we can change the selected
 * elements without having to start a new chain.
 *
 * @param this Curry instance
 * @param selector Element or a string to search for in DOM
 * @param append If set to true, old queried elements are preserved
 * @returns Curry instance for chaining
 */

export const _query: Query = function (this, selector, append?: boolean) {
  this.queue(() => {
    if (!selector)
      return

    const newQuery = queryDom(selector, this.doc)

    this.nodes = append
      ? [...this.nodes, ...newQuery]
      : newQuery
  })

  return this
}
