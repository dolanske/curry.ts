import type { Curry } from '..';
import type { IteratorCallback } from '../types';
export type Odd = (this: Curry, callback?: IteratorCallback) => Curry;
/**
 *
 * @param this Curry instance
 * @param callback Function to call for each odd element
 * @returns Curry instance for optional chaining
 */
export declare const _odd: Odd;
