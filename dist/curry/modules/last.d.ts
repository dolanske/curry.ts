import type { Curry } from '..';
import type { GenericCallback } from '../types';
export type Last = (this: Curry, callback?: GenericCallback) => Curry;
/**
 * Selects the flastirst node in the selected set
 *
 * @param this Curry instance
 * @param callback Function to call for selected node
 * @returns Curry instance for optional chaining
 */
export declare const _last: Last;
