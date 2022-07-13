import { $, Curry } from ".."
import { toEl } from "../util"

export type Visibility = (this: Curry) => Curry

export const _show: Visibility = function () {
  for (const _node of this.nodes) {
    const node = toEl<HTMLElement>(_node)
    node.style.removeProperty("display")
  }

  return this
}

export const _hide: Visibility = function () {
  for (const _node of this.nodes) {
    const node = toEl<HTMLElement>(_node)
    node.style.display = "none"
  }

  return this
}

export const _toggle: Visibility = function () {
  for (const _node of this.nodes) {
    const node = toEl<HTMLElement>(_node)

    if (node.style.display === "none") {
      $(node).show()
    } else {
      $(node).hide()
    }
  }

  return this
}
