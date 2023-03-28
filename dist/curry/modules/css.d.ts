import type { Properties, PropertiesHyphen } from 'csstype';
import type { Curry } from '..';
import type { ValueOf } from '../types';
interface CSSStyle extends Properties, PropertiesHyphen {
}
export type CSS = (this: Curry, key: keyof CSSStyle | CSSStyle, value?: ValueOf<CSSStyle>) => Curry;
/**
 *
 * @param this Curry instance
 * @param key Object containing CSS properties or a property name
 * @param value Property value
 * @returns Curry instance for optional chaining
 */
export declare const _css: CSS;
export {};
