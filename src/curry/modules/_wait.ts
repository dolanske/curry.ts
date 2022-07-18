import { Curry } from ".."

export type Wait = (this: Curry, timeout: number) => Curry

export const _wait: Wait = function (this, timeout) {
  this.queue(
    () => new Promise((resolve) => setTimeout(() => resolve(true), timeout))
  )

  return this
}
