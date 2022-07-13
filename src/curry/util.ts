import { Curry } from "."
import { PrevNextCallback } from "./types"

export function isArray(value: any): value is any[] {
  return Array.isArray(value)
}

export function toEl<T = Element>(node: Node): T {
  //@ts-ignore
  return node as T
}

export function isObject(value: any): value is object {
  let type = typeof value
  return value != null && (type == "object" || type == "function")
}

function getSiblingIndex(el: Element) {
  if (!el) return 0

  let i = 0
  let cloned: Element | null = el
  // While it has previous siblings, add +1 to the index
  while ((cloned = cloned.previousElementSibling) != null) {
    i++
  }

  return i
}

export function selectNTHSibling(
  this: Curry,
  selectType: "prev" | "next",
  index?: number | PrevNextCallback,
  callback?: PrevNextCallback
): Curry {
  const siblingPlace =
    selectType === "next" ? "nextElementSibling" : "previousElementSibling"

  // If callback has been provided but index hasn't
  if (typeof index !== "number") {
    callback = index
  }

  const matches: Element[] = []

  for (const _node of this.nodes) {
    const node = toEl(_node)

    if (node[siblingPlace]) {
      // If index is provided
      if (index) {
        const prev = node
        // Loop over next children and find element at index
        for (let i = 0; i < index; i++) {
          const sibling = node[siblingPlace]

          if (sibling) {
            matches.push(sibling)
            break
          }
        }

        // TODO: finish implementation

        // Callback
        // if (callback) {
        //   callback.apply(node, [{ self: node, prev, index: getSiblingIndex(node) }]) //prettier-ignore
        // }
      } else {
        // otherwise just select the next item
        // if (callback) {
        //   callback.apply(node, [{ self: node[siblingPlace], prev: node, index: getSiblingIndex(node[siblingPlace]) }]) //prettier-ignore
        // }

        const sibling = node[siblingPlace]

        if (sibling) {
          matches.push(sibling)
        }
      }
    }
  }

  this.nodes = matches

  return this
}
