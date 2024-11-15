import { DataType } from 'csstype';
import { Curry } from '..';
export interface SlideToggleOptions {
    easing?: DataType.EasingFunction;
    duration?: number;
    override?: boolean;
}
export type Slide = (this: Curry, duration?: number, easing?: string) => Curry;
/**
 * Slides element up and hides it
 *
 * @param this Curry instance
 * @param duration Animation duration
 * @param easing Animation easing
 * @returns Curry instance for chaining
 */
export declare const _slideUp: Slide;
/**
 * Slides element down to its original form
 *
 * @param this Curry instance
 * @param duration Animation duration
 * @param easing Animation easing
 * @returns Curry instance for chaining
 *
 */
export declare const _slideDown: Slide;
export type SlideToggle = (this: Curry, duration?: number | SlideToggleOptions, easing?: string) => Curry;
/**
 * Toggles between $.slideUp and $.slideDown depending on the element's
 * visibility
 *
 * Instead of the normal duration & easing options it also accepts an object,
 * with the respective options. An additional functionality is `override:
 * boolean`.
 *
 * If multiple nodes are selected to be toggled, `override = true` will pick the
 * state of the first node and apply the same slide to all remaining nodes.
 * Unifying the slide state of all nodes.
 *
 */
export declare const _slideToggle: SlideToggle;
//# sourceMappingURL=slide.d.ts.map