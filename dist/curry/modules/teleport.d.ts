import type { Curry } from '..';
export type Teleport = (this: Curry, destination: Element | string) => Curry;
/**
 *
 * @param this Curry instance
 * @param destination Element to teleport selected elemnents to
 * @returns Curry instance for optional chaining
 */
export declare const _teleport: Teleport;
