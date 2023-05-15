import type { Curry } from '..';
export type ClassManipulation = (this: Curry, className: string | string[]) => Curry;
export type ClassCheck = (this: Curry, className: string | string[], applyTo?: 'some' | 'every' | 'none') => boolean;
/**
 *
 * @param this Curry instance
 * @param className A string or array of strings to add to the class attribute
 * @returns Curry instance for optional chaining
 */
export declare const _addClass: ClassManipulation;
/**
 *
 * @param this Curry instance
 * @param className A string or array of strings to remove from the class attribute
 * @returns Curry instance for optional chaining
 */
export declare const _delClass: ClassManipulation;
/**
 *
 * @param this Curry instance
 * @param className A string or array of strings to toggle the class attribute
 * @returns Curry instance for optional chaining
 */
export declare const _toggleClass: ClassManipulation;
/**
 *
 * @param this Curry instance
 * @param className Class or an array of classes to check for
 * @param applyTo Decides wether to check if the condition is true for all, some or none of the selected elements
 * @returns Results of the condition check
 */
export declare const _hasClass: ClassCheck;
