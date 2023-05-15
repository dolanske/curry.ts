import type { Curry } from '..';
type NewNode = Element | string | Node | Array<Element | string | Node>;
export type Add = (this: Curry, node: NewNode, location?: 'prepend' | 'append') => Curry;
export declare const _add: Add;
/**
 * Shorthands for $.add()
 *
 * $.add('<element>', 'prepend')
 * $.add('<element>', 'append')
 */
export type AddShorthand = (this: Curry, node: NewNode) => Curry;
export declare const _prepend: AddShorthand;
export declare const _append: AddShorthand;
export {};
