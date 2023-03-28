import type { Curry } from '..';
import type { IteratorCallback } from '../types';
export type Nth = (this: Curry, index: number | number[], callback?: IteratorCallback) => Curry;
/**
 * Allows selection of a node or an array of nodes by the provided index(es)
 *
 * @param this Curry instance
 * @param index Selects the node by index
 * @param callback Function to call for selected node
 * @returns Curry instance for optional chaining
 */
export declare const _nth: Nth;
