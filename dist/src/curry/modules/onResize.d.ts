import { Curry } from '..';
export type OnResize = (this: Curry, fn: (this: Node, entry: ResizeObserverEntry[], observer: ResizeObserver) => void, options?: ResizeObserverOptions) => Curry;
/**
 * Attaches a resize observer to the selected nodes.
 * Chaining afterwards is async, meaning the following chain
 * runs only when a mutation occurs.
 *
 * @param this Curry instance
 * @param fn Callback to run when elements are resized
 * @param options Resize observer options
 * @returns Curry instance for optional chaining
 */
export declare const _onResize: OnResize;
export type StopOnResize = (this: Curry, fn?: MutationCallback | MutationCallback[]) => Curry;
/**
 * Stops the resize observation of the currently selected nodes
 *
 * @param this Curry instance
 * @returns Curry instance for optional chaining
 */
export declare const _stopOnResize: StopOnResize;
/**
 * Remove the resize observer assigned with this node
 *
 * @param node
 */
export declare function stopOnResize(node: Node | Node[]): void;
//# sourceMappingURL=onResize.d.ts.map