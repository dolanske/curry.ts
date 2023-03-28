import type { Curry } from '..';
import type { EventCallback } from '../types';
export type Hover = (this: Curry, states: {
    enter: EventCallback;
    leave: EventCallback;
} | EventCallback, options?: EventListenerOptions) => Curry;
/**
 *
 * @param this Curry instance
 * @param states Functions to execute when the mouse enters or leaves the element
 * @param options Event listner options
 * @returns Curry instance for optional chaining
 */
export declare const _hover: Hover;
