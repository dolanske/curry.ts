import { Curry, Selector } from '..';
export type Query = (this: Curry, selector: Selector, append?: boolean) => Curry;
/**
 * Functions the same as $(SELECTOR) but within a chain. Meaning we can change the selected
 * elements without having to start a new chain.
 *
 * @param this Curry instance
 * @param selector Element or a string to search for in DOM
 * @param append If set to true, old queried elements are preserved
 * @returns Curry instance for chaining
 */
export declare const _query: Query;
//# sourceMappingURL=query.d.ts.map