import { Curry } from ".."
import { isArray } from "../util"

export type Is = (
  this: Curry,
  condition: string | string[],
  apply?: "some" | "every" | "none"
) => boolean

/**
 *
 * @param condition A CSS selector or an array of CSS selectors.
 * @param apply Decides wether to check if the condition is true for all, some or none of the selected elements.
 * @returns Results of the condition check.
 */

export const _is: Is = function (condition, apply = "some") {
  let results: boolean[] = []

  this.nodes.forEach((node: Node) => {
    const el = node as Element

    if (isArray(condition)) {
      results.push(condition.every((c: string) => el.matches(c)))
    } else if (el.matches(condition)) {
      results.push(true)
    } else {
      results.push(false)
    }
  })

  switch (apply) {
    case "some": {
      return results.some((r) => r)
    }
    case "every": {
      return results.every((r) => r)
    }
    case "none": {
      return !results.some((r) => r)
    }
  }
}
