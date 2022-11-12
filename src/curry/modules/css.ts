import type { Properties, PropertiesHyphen } from 'csstype'
import type { Curry } from '..'
import { isNil, toEl } from '../util'
import type { ValueOf } from '../types'

interface CSSStyle extends Properties, PropertiesHyphen {}

export type CSS = (
  this: Curry,
  key: keyof CSSStyle | CSSStyle,
  value?: ValueOf<CSSStyle>
) => Curry

/**
 *
 * @param this Curry instance
 * @param key Object containing CSS properties or a property name
 * @param value Property value
 * @returns Curry instance for optional chaining
 */

export const _css: CSS = function (this, key, value) {
  this.queue(() => {
    for (const node of this.nodes) {
      const el = toEl<HTMLElement>(node)
      if (isNil(value))
        Object.assign(el.style, key)
      else if (typeof key === 'string')
        el.style.setProperty(key, String(value))
    }
  })

  return this
}
