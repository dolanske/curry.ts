import { Curry } from '..';
export type Trigger = (this: Curry, eventName: string, payload?: any) => Curry;
/**
 *
 * @param this Curry
 * @param eventName Custom event name
 * @param payload Optional payload which event listener will receive
 * @returns Curry instance
 */
export declare const _trigger: Trigger;
//# sourceMappingURL=trigger.d.ts.map