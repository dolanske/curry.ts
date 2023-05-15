import type { Curry } from '..';
export type Run = (this: Curry, fn: (this: Curry) => Promise<void> | void) => Curry;
/**
 * Execute a method within the queue. If method returns a promise, the chain waits for it to resolve.
 *
 * @param this Curry Instance
 * @param fn Method to execute
 * @returns Curry instance for chaining
 */
export declare const _run: Run;
