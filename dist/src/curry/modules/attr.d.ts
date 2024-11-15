import { Curry } from '..';
export interface Attr {
    [key: string]: string | number;
}
export type GetAttr = (this: Curry, key: string | string[]) => string | string[] | null;
/**
 * Returns one or more attribute values of the first matched element. To
 * check each matched element, first iterate over them with $.each()
 *
 * @param this Curry instance
 * @param key Attribute key or array of attribute keys to check for
 * @returns Value or array of values from the matched attribute keys
 */
export declare const _getAttr: GetAttr;
export type SetAttr = (this: Curry, key: Attr | Attr[] | string, value?: any) => Curry;
/**
 *
 * @param this Curry instance
 * @param key An attribute key, an object of attributes or an array of attributes
 * @param value Value to set the attribute to
 */
export declare const _setAttr: SetAttr;
//# sourceMappingURL=attr.d.ts.map