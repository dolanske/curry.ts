import type { Curry } from '..';
export type Wait = (this: Curry, timeout: number) => Curry;
/**
 * Method used to pause execution chain
 *
 * @param this Curry instance
 * @param timeout Length of pause in milliseconds
 * @returns Curry instance for chaining
 */
export declare const _wait: Wait;
