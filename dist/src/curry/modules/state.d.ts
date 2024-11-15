import { Curry } from '..';
export type Primitive = string | number | boolean | null | undefined;
export type State = <T extends Record<PropertyKey, any>>(this: Curry, data: T, fn: (this: HTMLElement, data: T, instance: Curry) => void) => T;
/**
 * Create a simple state object state and run DOM updates whenever the state is modified.
 *
 * @param this Curry instance
 * @param data Default state
 * @param onStateUpdate Callback which runs whenever update is changed.
 * @returns Proxied state. Modifying its properties will trigger the callback
 */
export declare const _state: State;
//# sourceMappingURL=state.d.ts.map