import type { Curry } from '..'

// TODO: add tests for function calling times and delays

export type Run = (
  this: Curry,
  fn: (this: Curry) => Promise<void> | void
) => Curry

/**
 * Execute a method within the queue. If method returns a promise, the chain waits for it to resolve.
 *
 * @param this Curry Instance
 * @param fn Method to execute
 * @returns Curry instance for chaining
 */

export const _run: Run = function (this, fn) {
  if (!fn)
    return this

  this.queue(() => fn.call(this))
  return this
}
