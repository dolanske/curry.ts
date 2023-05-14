import type { Curry } from '..'
import { isArray, isNil, isObject, toEl } from '../util'

export interface Attr {
  [key: string]: string | number
}

export type GetAttr = (
  this: Curry,
  key: string | string[]
) => string | string[] | null

/**
 * Returns one or more attribute values of the first matched element. To
 * check each matched element, first iterate over them with $.each()
 *
 * @param this Curry instance
 * @param key Attribute key or array of attribute keys to check for
 * @returns Value or array of values from the matched attribute keys
 */
export const _getAttr: GetAttr = function (this, key) {
  const node = toEl(this.nodes[0])

  if (isArray(key)) {
    const results = key
      .map(k => node.getAttribute(k))
      .filter(item => item) as string[]
    return results.length > 0 ? results : null
  }
  else {
    return node.getAttribute(key)
  }
}

export type SetAttr = (
  this: Curry,
  key: Attr | Attr[] | string,
  value?: any
) => Curry

function _set(node: HTMLElement, key: string, val: any) {
  if (isNil(val))
    node.removeAttribute(key)
  else
    node.setAttribute(key, String(val))
}

/**
 *
 * @param this Curry instance
 * @param key An attribute key, an object of attributes or an array of attributes
 * @param value Value to set the attribute to
 */

export const _setAttr: SetAttr = function (this, key, value) {
  this.queue(() => {
    for (const _node of this.nodes) {
      const node = toEl(_node)
      if (typeof key === 'string') {
        _set(node, key, value)
      }
      else if (isArray(key)) {
        for (const attr of key) {
          const key = Object.keys(attr)[0]
          const value = attr[key]
          _set(node, key, value)
        }
      }
      else if (isObject(key)) {
        const k = Object.keys(key)[0]
        const v = key[k]
        _set(node, k, v)
      }
    }
  })

  return this
}
