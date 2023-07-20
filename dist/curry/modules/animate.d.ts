import type { Properties } from 'csstype';
import type { Curry } from '..';
interface Options extends KeyframeAnimationOptions {
    onStart?: (animation: Animation) => void;
    onFinish?: (animation: Animation) => void;
    onCancel?: (animation: Animation, err: AnimationPlaybackEvent) => void;
    keepStyle?: boolean;
}
export type Animate = (this: Curry, animator: Properties | Properties[], options?: Options) => Curry;
/**
 *
 * @param this Curry instance
 * @param animator A keyframe or an array of keyframes
 * @param options Animation options
 * @returns Curry instance for chaining
 */
export declare const _animate: Animate;
export {};
