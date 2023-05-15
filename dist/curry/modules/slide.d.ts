import type { DataType } from 'csstype';
import type { Curry } from '..';
export interface SlideToggleOptions {
    easing?: DataType.EasingFunction;
    duration?: number;
    override?: boolean;
}
export type Slide = (this: Curry, duration?: number, easing?: string) => Curry;
export declare const _slideUp: Slide;
export declare const _slideDown: Slide;
export type SlideToggle = (this: Curry, duration?: number | SlideToggleOptions, easing?: string) => Curry;
export declare const _slideToggle: SlideToggle;
