import type { Curry } from '..'
import type { IteratorCallback } from '../types'
import { $ } from '..'
import { isArray, toEl } from '../util'

export type Filter = (
  this: Curry,
  condition: string | string[] | IteratorCallback<boolean>,
  applyTo?: 'some' | 'every' | 'none'
) => Curry

/**
 * Takes in one ore multiple conditions and filters selected nodes based on the results
 *
 * @param this Curry instance
 * @param condition Condition to filter the nodes by
 * @returns Curry instance for optional chaining
 */

export const _filter: Filter = function (this, condition, applyTo) {
  this.queue(() => {
    const matches: Element[] = []

    this.nodes.forEach((_node, index) => {
      const node = toEl(_node)

      if (isArray(condition)) {
        switch (applyTo) {
          case 'every': {
            if (condition.every(c => node.matches(c)))
              matches.push(node)
            break
          }
          case 'none': {
            if (!condition.some(c => node.matches(c)))
              matches.push(node)
            break
          }
          case 'some':
          default: {
            if (condition.some(c => node.matches(c)))
              matches.push(node)
          }
        }
      }
      else if (typeof condition === 'string') {
        if ($(node).is(condition))
          matches.push(node)
      }
      else {
        const result = condition.apply(node, [
          { instance: this, self: node, index },
        ])

        if (result)
          matches.push(node)
      }
    })

    this.nodes = matches
  })

  return this
}
