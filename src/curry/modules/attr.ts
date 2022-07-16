import { Curry } from ".."
import { toEl, isObject, isArray } from "../util"

export type Attr = {
  [key: string]: string | number
}

export type GetAttr = (
  this: Curry,
  key: string | string[]
) => string | string[] | null

/**
 * Returns one or more attribute values of the first matched element. To check each matched element, first iterate over them with $.each()
 *
 * @param this Curry instance
 * @param key Attribute key or array of attribute keys to check for
 * @returns Value or array of values from the matched attribute keys
 */
export const _getAttr: GetAttr = function (this, key) {
  const node = toEl(this.nodes[0])

  if (isArray(key)) {
    const results = key
      .map((k) => node.getAttribute(k))
      .filter((item) => item) as string[]
    return results.length > 0 ? results : null
  } else {
    return node.getAttribute(key)
  }
}

export type SetAttr = (
  this: Curry,
  key: Attr | Attr[] | string,
  value?: any
) => void

/**
 *
 * @param this Curry instance
 * @param key An attribute key, an object of attributes or an array of attributes
 * @param value Value to set the attribute to
 */
export const _setAttr: SetAttr = function (this, key, value) {
  this.nodes.forEach((_node) => {
    const node = toEl(_node)

    if (typeof key === "string" && value) {
      node.setAttribute(key, String(value))
    } else if (isArray(key)) {
      key.map((attr) => {
        const key = Object.keys(attr)[0]
        const value = attr[key]

        node.setAttribute(key, String(value))
      })
    } else if (isObject(key)) {
      const k = Object.keys(key)[0]
      const v = key[k]

      node.setAttribute(k, String(v))
    }
  })
}
