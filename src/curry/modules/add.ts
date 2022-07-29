// append

import { $, Curry } from ".."
import { isArray, toEl } from "../util"

type NewNode = Element | string | Node | Array<Element | string | Node>

export type Add = (
  this: Curry,
  node: NewNode,
  location?: "prepend" | "append"
) => Curry

export const _add: Add = function (this, node, location = "append") {
  this.queue(() => {
    if (!isArray(node)) node = [node]

    for (const _parent of this.nodes) {
      const parent = toEl(_parent)
      for (const child of node) {
        // Inserting DOM elements
        if (
          (child instanceof Element || child instanceof Node) &&
          parent.parentNode
        ) {
          if (location === "prepend") {
            parent.parentNode.insertBefore(child, parent)
          } else {
            parent.parentNode.insertBefore(child, parent.nextSibling)
          }
        }

        // Inserting template string
        if (typeof child === "string") {
          if (location === "prepend") {
            parent.insertAdjacentHTML("beforebegin", child)
          } else {
            parent.insertAdjacentHTML("afterend", child)
          }
        }
      }
    }
  })

  return this
}

// TODO: Add $.append and $.prepend shorthands

// export const _prepend: Add = function (this, node, location = "prepend") {
//   _add.call(this, [node, location])
//   return this
// }
