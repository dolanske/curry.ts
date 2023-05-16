import type { DataType } from 'csstype';
import type { Curry } from '..';
export type Fade = (this: Curry, options?: {
    duration?: number;
    to?: number;
    easing?: DataType.EasingFunction;
}) => Curry;
/**
 * Fades element into full view or the selected `to` value `>0`
 *
 * @param this Curry instance
 * @param options Fade options
 * @returns Curry instance for chaining
 */
export declare const _fadeIn: Fade;
/**
 * Fades element out of view or the selected `to` value `<1`
 *
 * @param this Curry instance
 * @param options Fade opitons
 * @returns Curry instance for chaining
 */
export declare const _fadeOut: Fade;
export type FadeToggle = (this: Curry, options?: number | {
    duration?: number;
    off?: number;
    on?: number;
    easing?: DataType.EasingFunction;
}) => Curry;
/**
 * Toggle between fade states or provided `on` and `off` states
 *
 * @param this Curry instance
 * @param options Fade opitons
 * @returns Curry instance for chaining
 */
export declare const _fadeToggle: FadeToggle;
