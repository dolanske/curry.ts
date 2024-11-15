import { Selector, Curry } from '.';
import { PrevNextCallback } from './types';
export declare function isArray(value: any): value is any[];
export declare function toEl<T = HTMLElement>(node: Node): T;
export declare function isObject(value: any): value is object;
export declare function isFunction(value: any): value is Function;
export declare function isNil(value?: any): boolean;
export declare function getSiblingIndex(el: Element): number;
export declare function selectNTHSibling(this: Curry, selectType: 'prev' | 'next', index?: number | PrevNextCallback, callback?: PrevNextCallback): Curry;
export declare function createElement(el: string): Element;
export declare function delay(ms?: number): Promise<void>;
export declare function queryDom(selector: Selector, doc?: Document): Node[];
export declare const formatPrefixAttr: (str: string) => string;
//# sourceMappingURL=util.d.ts.map