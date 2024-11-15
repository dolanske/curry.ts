import { Curry } from '..';
export type Siblings = (this: Curry, selector?: string) => Curry;
/**
 *
 * Selects all elements sibling elements
 *
 * @param this Curry instance
 * @param selector Filter the siblings by CSS selector
 * @returns Curry instance for optional chaining
 */
export declare const _siblings: Siblings;
/**
 *
 * Selects all previous sibling elements
 *
 * @param this Curry instance
 * @param selector Filter the siblings by CSS selector
 * @returns Curry instance for optional chaining
 */
export declare const _prevSiblings: Siblings;
/**
 *
 * Selects all sibling elements after current node
 *
 * @param this Curry instance
 * @param selector Filter the siblings by CSS selector
 * @returns Curry instance for optional chaining
 */
export declare const _nextSiblings: Siblings;
//# sourceMappingURL=siblings.d.ts.map