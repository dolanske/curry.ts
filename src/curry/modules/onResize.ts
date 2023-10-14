import { Curry } from ".."
import { toEl } from "../util"

export type OnResize = (
  this: Curry,
  fn: (
    this: Node,
    entry: ResizeObserverEntry[],
    observer: ResizeObserver
  ) => void,
  options?: ResizeObserverOptions
) => Curry

const registry = new WeakMap<Node, ResizeObserver>()

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

export const _onResize: OnResize = function (this, fn, options) {
  this.queue(async () => {
    // Check if API is supported, if not, this chain is skipped with a warning
    if (!("ResizeObserver" in window)) {
      return console.warn("Unsupported API - Mutation Observer")
    }

    return new Promise((resolve) => {
      for (const node of this.nodes) {
        const observer = new ResizeObserver((entries, observer) => {
          fn.apply(node, [entries, observer])
          resolve(true)
        })

        const _node = toEl(node)

        observer!.observe(_node, options)
        registry.set(_node, observer)
      }
    })
  })

  return this
}

// Stoppers

function _removeEntry(node: Node) {
  if (registry.has(node)) {
    const observer = registry.get(node)
    observer!.disconnect()
    registry.delete(node)
  }
}

export type StopOnResize = (
  this: Curry,
  fn?: MutationCallback | MutationCallback[]
) => Curry

/**
 * Stops the resize observation of the currently selected nodes
 *
 * @param this Curry instance
 * @returns Curry instance for optional chaining
 */

export const _stopOnResize: StopOnResize = function (this) {
  this.queue(() => {
    for (const node of this.nodes) {
      _removeEntry(node)
    }
  })

  return this
}

/**
 * Remove the resize observer assigned with this node
 *
 * @param node
 */

export function stopOnResize(node: Node | Node[]) {
  if (node instanceof Node) {
    _removeEntry(node)
  } else {
    for (const _node of node) {
      _removeEntry(_node)
    }
  }
}
