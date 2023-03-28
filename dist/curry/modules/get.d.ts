import type { Curry } from '..';
export type Get = <T = Element[] | Element | undefined>(this: Curry, key?: string) => Promise<T>;
/**
 *
 * Because chains can be async, if you want to await until a chain is finished, simply
 * append `.get()` at the end of it and `await` the entire chain. For example: `await $('#el').asyncEach().get()`
 *
 * @param this Curry instance
 * @param key A property of the selected element(s)
 * @returns Selected nodes or an array of values matched by the key
 *
 */
export declare const _get: Get;
