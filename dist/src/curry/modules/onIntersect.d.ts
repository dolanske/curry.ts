import { Curry } from '..';
interface IntersectOptionsNoRoot {
    rootMargin?: IntersectionObserver['rootMargin'];
    threshold: number | number[];
}
export type OnIntersect = (this: Curry, root: IntersectionObserver['root'], cb: (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => void, options?: IntersectOptionsNoRoot) => Curry;
/**
 * Observes teh selected nodes and how they interact with the provided root element.
 *
 * @param root Root element which we observer the provided nodes against
 * @param cb Callback to execute on intersection update
 * @param options Optional object to customize the observer
 * @returns Curry instance for optional chaining
 */
export declare const _onIntersect: OnIntersect;
export type StopOnIntersect = (this: Curry, fn?: MutationCallback | MutationCallback[]) => Curry;
/**
 * Stops the intersection observation of the currently selected nodes
 *
 * @param this Curry instance
 * @returns Curry instance for optional chaining
 */
export declare const _stopOnIntersect: StopOnIntersect;
/**
 * Remove the intersection observer assigned with this node
 *
 * @param node
 */
export declare function stopOnIntersect(node: Node | Node[]): void;
export {};
//# sourceMappingURL=onIntersect.d.ts.map