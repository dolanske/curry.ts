import type { Curry } from '..';
export type Replace = (this: Curry, target: string | Element | Node, el?: string | Element | Node, doc?: Document) => Curry;
export type StaticReplace = (target: string | Element | Node, el: string | Element | Node, doc?: Document) => void;
/**
 *
 * @param target Target element to replace
 * @param el Element we replace with
 * @param doc A substitude document to query elements from
 * @returns Curry instance
 */
export declare const _staticReplace: StaticReplace;
/**
 *
 * @param this Curry instance
 * @param target Target element to replace
 * @param el Element we replace with
 * @returns Curry instance for chaining
 */
export declare const _replace: Replace;
