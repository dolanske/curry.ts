import { Curry } from '..';
import { GenericCallback } from '../types';
export type First = (this: Curry, callback?: GenericCallback) => Curry;
/**
 * Selects the first node in the selected set
 *
 * @param this Curry instance
 * @param callback Function to call for selected node
 * @returns Curry instance for optional chaining
 */
export declare const _first: First;
//# sourceMappingURL=first.d.ts.map