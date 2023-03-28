import type { Curry } from '..';
export type Visibility = (this: Curry) => Curry;
export declare const _show: Visibility;
export declare const _hide: Visibility;
export declare const _toggle: Visibility;
