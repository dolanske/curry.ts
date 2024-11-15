import { Curry } from '..';
import { EventCallback } from '../types';
export type Click = (this: Curry, callback?: EventCallback) => Curry;
/**
 *
 * @param this Curry instance
 * @param callback Function executed when the event is triggered
 * @returns Curry instance for optional chaining
 */
export declare const _click: Click;
//# sourceMappingURL=click.d.ts.map