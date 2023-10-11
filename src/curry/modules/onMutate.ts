import { Curry } from "..";

export type OnMutate = (
  this: Curry,
  callback: (this: Node, records: MutationRecord[], observer: MutationObserver) => void,
  options?: MutationObserverInit,
) => Curry

const registry = new WeakMap<Node, MutationObserver>()

/**
 * Adds a mutation observer to the selected nodes. 
 * Chaining afterwards is async, meaning the following chain 
 * runs only when a mutation occurs.
 * 
 * @param this Curry instance
 * @param fn Callback to run when elements are updated
 * @param options Mutation observer init options
 * @returns Curry instance for optional chaining
 */

export const _onMutate: OnMutate = function (this, fn, options = {}) {
  this.queue(async () => {

    return new Promise((resolve) => {
      const defaults: MutationObserverInit = { attributes: true, childList: true, subtree: true };
      options = Object.assign(options, defaults)

      // Check if API is supported, if not, this chain is skipped with a warning
      if (!('MutationObserver' in window)) {
        console.warn('Unsupported API - Mutation Observer')
        return resolve(true)
      }

      for (const node of this.nodes) {
        const observer = new MutationObserver((records, observer) => {
          fn.apply(node, [records, observer])
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

function _removeOnMutate(node: Node) {
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
 * Stops the observation of the currently selected nodes
 * 
 * @param this Curry instance
 * @returns Curry instance for optional chaining
 */

export const _stopOnMutate: StopOnMutate = function (this) {
  this.queue(() => {
    for (const node of this.nodes) {
      _removeOnMutate(node)
    }
  })

  return this
}

/**
 * Remove mutation observer assigned with this node
 * 
 * @param node 
 */

export function stopOnMutate(node: Node | Node[]) {
  if (node instanceof Node) {
    _removeOnMutate(node)
  }
  else {
    for (const _node of node) {
      _removeOnMutate(_node)
    }
  }
}