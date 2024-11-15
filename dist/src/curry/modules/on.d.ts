import { Curry } from '..';
import { EventCallback } from '../types';
export type On = (this: Curry, eventName: string, callback?: EventCallback, options?: {
    passive?: boolean;
    once?: boolean;
    capture?: boolean;
}) => Curry;
/**
 *
 * @param this Curry instance
 * @param eventName Event name
 * @param callback Executed when the event is triggered
 * @param options Event listener options
 * @returns Curry instance for optional chaining
 */
export declare const _on: On;
//# sourceMappingURL=on.d.ts.map