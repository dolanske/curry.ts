import { $, Curry } from ".."
import { EventCallback } from "../types"
import { isFunction, toEl } from "../util"

export type Hover = (
  this: Curry,
  states:
    | {
        enter: EventCallback
        leave: EventCallback
      }
    | EventCallback,
  options?: EventListenerOptions
) => Curry

/**
 *
 * @param this Curry instance
 * @param states Functions to execute when the mouse enters or leaves the element
 * @param options Event listner options
 * @returns Curry instance for optional chaining
 */

export const _hover: Hover = function (this, states, options) {
  if (!isFunction(states)) {
    const { enter, leave } = states

    for (const _node of this.nodes) {
      const node = toEl(_node)

      $(node).on(
        "mouseenter",
        (event) => enter.apply(node, [event, this]),
        options
      )
      $(node).on(
        "mouseleave",
        (event) => leave.apply(node, [event, this]),
        options
      )
    }
  } else {
    // Callback
    const cloned: Element[] = []

    this.nodes.forEach((_node, index) => {
      const node = toEl(_node)
      cloned[index] = toEl(node.cloneNode(true))

      // Apply styles like normal
      $(node).on(
        "mouseenter",
        (event) => states.apply(node, [event, this]),
        options
      )

      // Reset node
      $(node).on("mouseleave", () => {
        const clone = cloned[index]
        node.removeAttribute("style")
        node.removeAttribute("class")
        node.innerHTML = clone.innerHTML
        // node.classList = clone.classList

        for (const cls in clone.classList) {
          node.classList.add(cls)
        }

        const keepAttrs = []
        // Remove all attributes, save the ones from the clone
        // I had to use while because for some reason not all attributes
        // would get removed in a for loop. There is probably faster
        // way to achieve the same results but I have small brain
        while (node.attributes.length > 0) {
          const attr = node.attributes[0].name

          node.removeAttribute(attr)

          if ($(clone).getAttr(attr)) keepAttrs.push(attr)
        }

        // Iterated over saved ones
        keepAttrs.map((attr) => {
          $(node).setAttr(attr, $(clone).getAttr(attr))
        })
      })
    })
  }

  return this
}
