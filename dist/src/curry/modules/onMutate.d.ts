import { Curry } from '..';
export type OnMutate = (this: Curry, callback: (this: Node, entries: MutationRecord[], observer: MutationObserver) => void, options?: MutationObserverInit) => Curry;
/**
 * Attaches a mutation observer to the selected nodes.
 * Chaining afterwards is async, meaning the following chain
 * runs only when a mutation occurs.
 *
 * @param this Curry instance
 * @param fn Callback to run when elements are mutated
 * @param options Mutation observer options
 * @returns Curry instance for optional chaining
 */
export declare const _onMutate: OnMutate;
export type StopOnMutate = (this: Curry, fn?: MutationCallback | MutationCallback[]) => Curry;
/**
 * Stops the mutation observation of the currently selected nodes
 *
 * @param this Curry instance
 * @returns Curry instance for optional chaining
 */
export declare const _stopOnMutate: StopOnMutate;
/**
 * Remove the mutation observer assigned with this node
 *
 * @param node
 */
export declare function stopOnMutate(node: Node | Node[]): void;
//# sourceMappingURL=onMutate.d.ts.map