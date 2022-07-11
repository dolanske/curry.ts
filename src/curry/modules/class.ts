import { Curry } from ".."
import { toEl } from "../util"

export type ClassManipulation = (
  this: Curry,
  className: string | string[]
) => Curry

/**
 *
 * @param this Curry instance
 * @param className A string or array of strings to add to the class attribute
 * @returns Curry instance
 */

export const _addClass: ClassManipulation = function (this, className) {
  this.nodes.forEach((node: Node) => {
    const el = toEl(node)
    className = typeof className === "string" ? [className] : className
    el.classList.add(...className)
  })

  return this
}

/**
 *
 * @param this Curry instance
 * @param className A string or array of strings to remove from the class attribute
 * @returns Curry instance
 */
export const _delClass: ClassManipulation = function (this, className) {
  this.nodes.forEach((node: Node) => {
    const el = toEl(node)
    className = typeof className === "string" ? [className] : className
    el.classList.remove(...className)
  })

  return this
}

/**
 *
 * @param this Curry instance
 * @param className A string or array of strings to toggle the class attribute
 * @returns Curry instance
 */
export const _tglClass: ClassManipulation = function (this, className) {
  this.nodes.forEach((node: Node) => {
    const el = toEl(node)
    className = typeof className === "string" ? [className] : className

    className.map((cls: string) => {
      el.classList.toggle(cls)
    })
  })

  return this
}
