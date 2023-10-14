import { Curry } from "..";
import { toEl } from "../util";

type IntersectOptionsNoRoot = {
  rootMargin?: IntersectionObserver['rootMargin'],
  threshold: number | number[]
}

export type OnIntersect = (
  this: Curry,
  root: IntersectionObserver['root'],
  cb: (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => void,
  options?: IntersectOptionsNoRoot
) => Curry

const registry = new WeakMap<Node, IntersectionObserver>()


/**
 * Observes teh selected nodes and how they interact with the provided root element.
 * 
 * @param root Root element which we observer the provided nodes against
 * @param cb Callback to execute on intersection update
 * @param options Optional object to customize the observer
 * @returns Curry instance for optional chaining
 */

export const _onIntersect: OnIntersect = function (root, cb, options) {
  this.queue(() => {
    // Check if API is supported, if not, this chain is skipped with a warning
    if (!("IntersectionObserver" in window)) {
      return console.warn("Unsupported API - Intersection Observer")
    }

    const defaults: IntersectOptionsNoRoot = {
      rootMargin: '0px',
      threshold: 0.1,
    }
    options = Object.assign(defaults, options, root)

    for (const _node of this.nodes) {
      const observer = new IntersectionObserver((entries, observer) => {
        cb.apply(_node, [entries, observer])
      }, defaults)

      observer.observe(toEl(_node))
      registry.set(_node, observer)
    }
  })

  return this
}

// Stopper

function _removeEntry(node: Node) {
  if (registry.has(node)) {
    const observer = registry.get(node)
    observer!.disconnect()
    registry.delete(node)
  }
}

export type StopOnIntersect = (
  this: Curry,
  fn?: MutationCallback | MutationCallback[]
) => Curry

/**
 * Stops the intersection observation of the currently selected nodes
 *
 * @param this Curry instance
 * @returns Curry instance for optional chaining
 */

export const _stopOnIntersect: StopOnIntersect = function (this) {
  this.queue(() => {
    for (const node of this.nodes) {
      _removeEntry(node)
    }
  })

  return this
}

/**
 * Remove the intersection observer assigned with this node
 *
 * @param node
 */

export function stopOnIntersect(node: Node | Node[]) {
  if (node instanceof Node) {
    _removeEntry(node)
  } else {
    for (const _node of node) {
      _removeEntry(_node)
    }
  }
}