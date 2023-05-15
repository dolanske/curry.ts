import type { Curry } from '..';
import type { PrevNextCallback } from '../types';
export type Next = (this: Curry, index?: number, callback?: PrevNextCallback) => Curry;
/**
 *
 * @param this Curry instance
 * @param index Specify how many next siblings to skip
 * @param callback Function to call on on selected element
 * @returns Curry instance for optional chaining
 */
export declare const _next: Next;
