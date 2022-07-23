import { Curry } from ".."

export type Text = (
  this: Curry,
  text: string | number,
  location?: "prepend" | "append"
) => Curry

/**
 *
 * @param this Curry instance
 * @param text Text content to set to the element
 * @param location Where to place the text Leave empty if you want to replace the text
 * @returns Curry instance for optional chaining
 */

export const _text: Text = function (this, text, location) {
  this.queue(() => {
    this.nodes.forEach((node: Node) => {
      if (text) {
        switch (location) {
          case "prepend": {
            node.textContent = String(text) + node.textContent
            break
          }
          case "append": {
            node.textContent = node.textContent + String(text)
            break
          }
          default: {
            node.textContent = String(text)
          }
        }
      }
    })
  })

  return this
}
