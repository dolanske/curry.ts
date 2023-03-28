import type { Curry } from '..';
import type { KeyboardeventCallback } from '../types';
import type { KeyboardEventKey } from '../keycodes';
type KeyboardEvents = 'keydown' | 'keyup' | 'keypress';
type Keys = KeyboardEventKey | KeyboardEventKey[];
/**
 * Wrapper for DOM keyboard events
 */
export declare class Key {
    curryInstance: Curry;
    constructor(curry: Curry);
    /**
     * Same as addEventListener('keydown')
     *
     * @param keys Key or an array of keys (use capital letters for functional keys)
     * @param callback  Executed when the key(s) is/are pressed in the exact order
     */
    down(keys: Keys, callback: KeyboardeventCallback): void;
    /**
     * Same as addEventListener('keyup')
     *
     * @param keys Key or an array of keys (use capital letters for functional keys)
     * @param callback  Executed when the key(s) is/are pressed in the exact order
     */
    up(keys: Keys, callback: KeyboardeventCallback): void;
    /**
     * Same as addEventListener('keypress')
     *
     * @param keys Key or an array of keys (use capital letters for functional keys)
     * @param callback  Executed when the key(s) is/are pressed in the exact order
     */
    press(keys: Keys, callback: KeyboardeventCallback): void;
}
export declare class History {
    registry: KeyboardEventKey[];
    max: number;
    constructor(max?: number);
    add(item: KeyboardEventKey): void;
    pressing(keys: KeyboardEventKey[]): boolean;
}
export declare function handleKeyPress(this: Curry, type: KeyboardEvents, keys: Keys, callback: KeyboardeventCallback): void;
export {};
