import { Curry } from ".."

export type OnMutate = (
  this: Curry,
  callback: (
    this: Node,
    entries: MutationRecord[],
    observer: MutationObserver
  ) => void,
  options?: MutationObserverInit
) => Curry

const registry = new WeakMap<Node, MutationObserver>()

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

export const _onMutate: OnMutate = function (this, fn, options = {}) {
  this.queue(async () => {
    // Check if API is supported, if not, this chain is skipped with a warning
    if (!("MutationObserver" in window)) {
      return console.warn("Unsupported API - Mutation Observer")
    }

    return new Promise((resolve) => {
      const defaults: MutationObserverInit = {
        attributes: true,
        childList: true,
        subtree: true
      }
      options = Object.assign(options, defaults)

      for (const node of this.nodes) {
        const observer = new MutationObserver((entries, observer) => {
          fn.apply(node, [entries, observer])
          resolve(true)
        })

        observer!.observe(node, options)
        registry.set(node, observer)
      }
    })
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

export type StopOnMutate = (
  this: Curry,
  fn?: MutationCallback | MutationCallback[]
) => Curry

/**
 * Stops the mutation observation of the currently selected nodes
 *
 * @param this Curry instance
 * @returns Curry instance for optional chaining
 */

export const _stopOnMutate: StopOnMutate = function (this) {
  this.queue(() => {
    for (const node of this.nodes) {
      _removeEntry(node)
    }
  })

  return this
}

/**
 * Remove the mutation observer assigned with this node
 *
 * @param node
 */

export function stopOnMutate(node: Node | Node[]) {
  if (node instanceof Node) {
    _removeEntry(node)
  } else {
    for (const _node of node) {
      _removeEntry(_node)
    }
  }
}
