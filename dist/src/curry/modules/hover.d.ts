import { Curry } from '..';
import { EventCallback } from '../types';
export type Hover = (this: Curry, states: {
    enter: EventCallback;
    leave: EventCallback;
} | EventCallback, options?: EventListenerOptions) => Curry;
/**
 * Note: Hover does not support chain triggering. If you want to trigger a chain on hover, use $.on('mouseenter').<methods>
 *
 * @param this Curry instance
 * @param states Functions to execute when the mouse enters or leaves the element
 * @param options Event listner options
 * @returns Curry instance for optional chaining
 */
export declare const _hover: Hover;
//# sourceMappingURL=hover.d.ts.map