import { Curry } from ".."

export type Text = (
  this: Curry,
  text: string,
  location?: "prepend" | "append"
) => Curry

/**
 *
 * @param this Curry instance.
 * @param text Text content to set to the element.
 * @param location Where to place the text. Leave empty if you want to replace the text.
 * @returns Curry instance.
 */

export const _text: Text = function (this, text, location) {
  this.nodes.forEach((node: Node) => {
    if (text) {
      switch (location) {
        case "prepend": {
          node.textContent = text + node.textContent
          break
        }
        case "append": {
          node.textContent = text + node.textContent
          break
        }
        default: {
          node.textContent = text
        }
      }
    }
  })

  return this
}
