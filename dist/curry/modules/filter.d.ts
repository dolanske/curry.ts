import type { Curry } from '..';
import type { IteratorCallback } from '../types';
export type Filter = (this: Curry, condition: string | string[] | IteratorCallback<boolean>, applyTo?: 'some' | 'every' | 'none') => Curry;
/**
 * Takes in one ore multiple conditions and filters selected nodes based on the results
 *
 * @param this Curry instance
 * @param condition Condition to filter the nodes by
 * @returns Curry instance for optional chaining
 */
export declare const _filter: Filter;
