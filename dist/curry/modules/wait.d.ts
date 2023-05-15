import type { Curry } from '..';
export type Wait = (this: Curry, timeout: number) => Curry;
/**
 * Method used to pause execution chain
 *
 * @param this Curry instace
 * @param timeout Length of pause in miliseconds
 * @returns Curry instance for chaining
 */
export declare const _wait: Wait;
