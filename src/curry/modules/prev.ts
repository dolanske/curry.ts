import { selectNTHSibling } from '../util'
import type { Next } from './next'

/**
 *
 * @param this Curry instance
 * @param index Specify how many previous siblings to skip
 * @param callback Function to call on on selected element
 * @returns Curry instance for optional chaining
 */

export const _prev: Next = function (this, index, callback) {
  return selectNTHSibling.apply(this, ['prev', index, callback])
}
