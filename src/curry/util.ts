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

export function isFunction(value: any): value is Function {
  return value && {}.toString.call(value) === "[object Function]"
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
  this.queue(() => {
    const siblingPlace =
      selectType === "next" ? "nextElementSibling" : "previousElementSibling"

    // If callback has been provided but index hasn't
    if (typeof index !== "number") {
      callback = index
    }

    const matches: Element[] = []

    for (const _node of this.nodes) {
      const node = toEl(_node)
      const sibling = node[siblingPlace]

      // When no index jump is provided
      // Just select the next element
      if (!index || index === 1) {
        if (sibling) {
          matches.push(sibling)

          if (callback) {
            callback.apply(sibling, [
              // prettier-ignore
              { self: sibling, prev: node, index: getSiblingIndex(sibling), instance: this }
            ])
          }
        }
      } else {
        let el: Element | null = node
        // Loop over next children and find element at index
        for (let i = 0; i < index; i++) {
          if (el) {
            el = el[siblingPlace]
          }
        }

        if (el) {
          matches.push(el)

          if (callback) {
            callback.apply(el, [
              // prettier-ignore
              { self: el, prev: node, index: getSiblingIndex(node), instance: this }
            ])
          }
        }
      }
    }

    this.nodes = matches
  })

  return this
}

export function createElement(el: string): Element {
  const fragment = document.createElement("div")
  fragment.insertAdjacentHTML("beforeend", el)
  return fragment.children[0]
}

export function delay(ms: number = 1): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
