// Can be a function called within an async chain or at the end of the chain

import type { Curry } from '..'

// TODO: Add documentaiton
// TODO: add tests for function calling times and delays

export type Run = (
  this: Curry,
  fn: (this: Curry) => Promise<void> | void
) => Curry

export const _run: Run = function (this, fn) {
  this.queue(() => {
    return fn.call(this)
  })

  return this
}
