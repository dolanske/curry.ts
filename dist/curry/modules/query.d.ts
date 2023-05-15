import type { Curry, Selector } from '..';
export type Query = (this: Curry, selector: Selector) => Curry;
/**
 * Functions the same as $(SELECTOR) but within a chain. Meaning we can change the selected
 * elements without having to start a new chain.
 *
 * @param this Curry instance
 * @param selector Element or a string to search for in DOM
 * @returns Curry instance for chaining
 */
export declare const _query: Query;
