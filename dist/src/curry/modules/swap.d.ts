import { Curry } from '..';
export type StaticSwap = (target: Element | Node | string, el: Element | Node | string, doc?: Document) => void;
/**
 *
 * @param target First element
 * @param el Second element
 * @returns Curry instance for chaining
 */
export declare const _staticSwap: StaticSwap;
export type Swap = (this: Curry, target: Element | Node | string, el?: Element | Node | string, doc?: Document) => Curry;
/**
 *
 * @param this Curry instance
 * @param target First element
 * @param el Second element
 * @returns Curry instance for chaining
 */
export declare const _swap: Swap;
//# sourceMappingURL=swap.d.ts.map