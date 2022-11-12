import type { Curry } from '..'
import { $ } from '..'
import { toEl } from '../util'

export type Del = (this: Curry, selector?: string | string[]) => void

/**
 *
 * @param this Currt instance
 * @param selector Optionally filter nodes to remove
 */

export const _del: Del = function (this, selector) {
  this.queue(() => {
    for (const node of this.nodes) {
      const el = toEl(node)

      if (selector && !$(el).is(selector))
        return

      el.remove()
    }
  })
}
