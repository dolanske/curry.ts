import type { Curry } from '..';
export type Primitive = string | number | boolean | null | undefined;
export type BindFn<T> = (this: HTMLElement, obj: T, instance: Curry) => void;
export type RawObject = Record<PropertyKey, Primitive>;
export type Bind = <T extends RawObject>(this: Curry, data: T, fn: BindFn<T>) => T;
export declare const _bind: Bind;
