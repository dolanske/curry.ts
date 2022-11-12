import type { Curry } from '..'
import { isArray, toEl } from '../util'

export type Is = (
  this: Curry,
  condition: string | string[],
  applyTo?: 'some' | 'every' | 'none'
) => boolean

/**
 *
 * @param condition A CSS selector or an array of CSS selectors
 * @param applyTo Decides wether to check if the condition is true for all, some or none of the selected elements
 * @returns Results of the condition check
 */

// TODO:
// Decide if applyTo should be relevant to the condition
// or matched elements

// NOTE:
// applyTo could be used for condition matching instead of elements
// and $.are could be the same as $.is but applyTo would be for a list

// $.is(["#id", ".class"], "some")
// NOTE: this means at least one of the conditions applies ot the FIRST element in the selected list

// $.are(["#id", ".class"])
// NOTE: returns true if every matched element matches the condition

// $.none(["#id", ".class"])
// Returns true if none of the matched elements match the condition

export const _is: Is = function (condition, applyTo = 'some') {
  const results: boolean[] = []

  for (const _node of this.nodes) {
    const el = toEl(_node)

    if (isArray(condition))
      results.push(condition.every((c: string) => el.matches(c)))
    else if (el.matches && el.matches(condition))
      results.push(true)
    else
      results.push(false)
  }

  switch (applyTo) {
    case 'some': {
      return results.some(r => r)
    }
    case 'every': {
      return results.every(r => r)
    }
    case 'none': {
      return !results.some(r => r)
    }
  }
}
