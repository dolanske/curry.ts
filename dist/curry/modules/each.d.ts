import type { Curry } from '..';
import type { IteratorCallback } from '../types';
export type Each = (this: Curry, callback: IteratorCallback) => Curry;
/**
 *
 * @param this Curry instance
 * @param callback Function to call for each node
 * @returns Curry instance for optional chaining
 */
export declare const _each: Each;
