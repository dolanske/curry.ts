import type { Curry } from '..'
import { delay } from '../util'

export type Wait = (this: Curry, timeout: number) => Curry

/**
 * Method used to pause execution chain
 *
 * @param this Curry instace
 * @param timeout Length of pause in miliseconds
 * @returns Curry instance for chaining
 */

export const _wait: Wait = function (this, timeout = 1) {
  this.queue(() => delay(timeout))
  return this
}
