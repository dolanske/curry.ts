import type { Curry } from '..';
import type { GenericCallback } from '../types';
export type NthChild = (this: Curry, index: number | number[], callback?: GenericCallback) => Curry;
export declare const _nthChild: NthChild;
