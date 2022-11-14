import type { Curry, Selector } from '..'
import { queryDom } from '../util'

export type Find = (
  this: Curry,
  selector: Selector
) => Curry

/**
 * Functions the same as $(SELECTOR) but within a chain. Meaning we can change the selected
 * elements without having to start a new chain.
 *
 * @param this Curry instance
 * @param selector Element or a string to search for in DOM
 * @returns Curry instance for chaining
 */

export const _find: Find = function (this, selector) {
  this.queue(() => {
    this.nodes = queryDom(selector)
  })

  return this
}
