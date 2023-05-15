import type { Curry } from '..';
export type Del = (this: Curry, selector?: string | string[]) => void;
/**
 *
 * @param this Currt instance
 * @param selector Optionally filter nodes to remove
 */
export declare const _del: Del;
