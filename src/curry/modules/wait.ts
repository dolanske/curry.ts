import { Curry } from ".."

export type Wait = (this: Curry, timeout: number) => Curry

export const _wait: Wait = function (this, timeout = 1) {
  this.queue(() => new Promise((resolve) => setTimeout(resolve, timeout)))

  return this
}
