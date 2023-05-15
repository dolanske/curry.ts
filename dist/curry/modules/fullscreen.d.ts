import type { Curry } from '..';
type MergedOptions = FullscreenOptions & {
    onOpen?: () => void;
    onError?: (error: Error) => void;
};
export type StaticFullscreen = (target: string | Element | Node, options?: MergedOptions, doc?: Document) => Promise<void>;
export type Fullscreen = (this: Curry, target?: string | Element | Node | MergedOptions, options?: MergedOptions) => void;
/**
 *
 * @param target Target element which will be the wrapper for fullscreen layout
 * @returns Promise which resolves if fullscreen opens
 */
export declare const _staticFullscreen: StaticFullscreen;
/**
 *
 * @param this Curry instance
 * @param target Target element which will be the wrapper for fullscreen layout
 * @returns Curry instance
 */
export declare const _fullscreen: Fullscreen;
export {};
