import type { Text } from './modules/text';
import type { Get } from './modules/get';
import type { Is } from './modules/is';
import type { On } from './modules/on';
import type { Click } from './modules/click';
import type { Del } from './modules/del';
import type { CSS } from './modules/css';
import type { ClassCheck, ClassManipulation } from './modules/class';
import type { Each } from './modules/each';
import type { AsyncEach } from './modules/asyncEach';
import type { Nth } from './modules/nth';
import type { First } from './modules/first';
import type { Last } from './modules/last';
import type { Odd } from './modules/odd';
import type { Even } from './modules/even';
import type { Next } from './modules/next';
import type { Children } from './modules/children';
import type { Visibility } from './modules/visibility';
import type { GetAttr, SetAttr } from './modules/attr';
import type { Filter } from './modules/filter';
import type { Teleport } from './modules/teleport';
import type { Hover } from './modules/hover';
import type { Parent } from './modules/parent';
import type { Wait } from './modules/wait';
import type { Replace, StaticReplace } from './modules/replace';
import type { StaticSwap, Swap } from './modules/swap';
import type { NthChild } from './modules/nthChild';
import type { Add, AddShorthand } from './modules/add';
import { Key } from './modules/key';
import type { Trigger } from './modules/trigger';
import type { Animate } from './modules/animate';
import type { Fullscreen, StaticFullscreen } from './modules/fullscreen';
import type { Fade, FadeToggle } from './modules/fade';
import type { Run } from './modules/run';
import type { Query } from './modules/query';
export type Selector = string | Node | Node[] | HTMLCollection | Curry;
export declare function $(selector: Selector, doc?: Document): Curry;
export declare class Curry {
    doc?: Document;
    nodes: Node[];
    taskQueue: Promise<any>;
    constructor(selector: Selector, doc?: Document);
    fullscreen: Fullscreen;
    prependChild: AddShorthand;
    appendChild: AddShorthand;
    fadeToggle: FadeToggle;
    asyncEach: AsyncEach;
    addClass: ClassManipulation;
    delClass: ClassManipulation;
    tglClass: ClassManipulation;
    children: Children;
    hasClass: ClassCheck;
    teleport: Teleport;
    nthChild: NthChild;
    addChild: Add;
    prepend: AddShorthand;
    setAttr: SetAttr;
    getAttr: GetAttr;
    replace: Replace;
    trigger: Trigger;
    animate: Animate;
    fadeOut: Fade;
    filter: Filter;
    fadeIn: Fade;
    append: AddShorthand;
    toggle: Visibility;
    parent: Parent;
    click: Click;
    first: First;
    hover: Hover;
    wait: Wait;
    swap: Swap;
    show: Visibility;
    hide: Visibility;
    query: Query;
    text: Text;
    each: Each;
    last: Last;
    even: Even;
    next: Next;
    prev: Next;
    add: Add;
    del: Del;
    odd: Odd;
    get: Get;
    css: CSS;
    nth: Nth;
    run: Run;
    key: Key;
    is: Is;
    on: On;
    /**
     * Functions which return Curry instance can be queued to be asyncronously executed.
     */
    queue<T = void>(fn: () => T): Promise<any>;
    static fullscreen: StaticFullscreen;
    static replace: StaticReplace;
    static swap: StaticSwap;
    static text(el: Selector, text: string | number): Curry;
    get length(): number;
    /**
     *  Experimental extension API
     */
    static $fn(name: string, fn: (this: Curry) => void): void;
}
