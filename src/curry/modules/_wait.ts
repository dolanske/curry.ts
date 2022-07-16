import { Curry } from ".."

export type Wait = (this: Curry, timeout: number) => Promise<Curry>

export const _wait: Wait = function (this, timeout) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(this)
    }, timeout)
  })
}
