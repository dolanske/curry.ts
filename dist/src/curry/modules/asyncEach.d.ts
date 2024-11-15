import { Curry } from '..';
export type AsyncEach = (this: Curry, callback: (this: Element, next: <T>(value?: T | PromiseLike<T>) => void, options: {
    self: Element;
    index: number;
    instance: Curry;
}) => void) => Curry;
/**
 * Works the same as $.each() but to go the next loop we need to call next()
 *
 * @param this Curry instance
 * @param callback Asynchronous function to call for each node
 */
export declare const _asyncEach: AsyncEach;
//# sourceMappingURL=asyncEach.d.ts.map