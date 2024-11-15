import { Curry } from '..';
export type Is = (this: Curry, condition: string | string[], applyTo?: 'some' | 'every' | 'none') => boolean;
/**
 *
 * @param condition A CSS selector or an array of CSS selectors
 * @param applyTo Decides wether to check if the condition is true for all, some or none of the selected elements
 * @returns Results of the condition check
 */
export declare const _is: Is;
//# sourceMappingURL=is.d.ts.map