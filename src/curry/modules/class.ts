import type { Curry } from '..'
import { toEl } from '../util'

export type ClassManipulation = (
  this: Curry,
  className: string | string[]
) => Curry

export type ClassCheck = (
  this: Curry,
  className: string | string[],
  applyTo?: 'some' | 'every' | 'none'
) => boolean

/**
 *
 * @param this Curry instance
 * @param className A string or array of strings to add to the class attribute
 * @returns Curry instance for optional chaining
 */

export const _addClass: ClassManipulation = function (this, className) {
  this.queue(() => {
    this.nodes.forEach((node: Node) => {
      const el = toEl(node)
      className = typeof className === 'string' ? [className] : className
      el.classList.add(...className)
    })
  })

  return this
}

/**
 *
 * @param this Curry instance
 * @param className A string or array of strings to remove from the class attribute
 * @returns Curry instance for optional chaining
 */
export const _delClass: ClassManipulation = function (this, className) {
  this.queue(() => {
    this.nodes.forEach((node: Node) => {
      const el = toEl(node)
      className = typeof className === 'string' ? [className] : className
      el.classList.remove(...className)
    })
  })

  return this
}

/**
 *
 * @param this Curry instance
 * @param className A string or array of strings to toggle the class attribute
 * @returns Curry instance for optional chaining
 */
export const _tglClass: ClassManipulation = function (this, className) {
  this.queue(() => {
    this.nodes.forEach((node: Node) => {
      const el = toEl(node)
      className = typeof className === 'string' ? [className] : className

      for (const cls of className)
        el.classList.toggle(cls)
    })
  })

  return this
}

/**
 *
 * @param this Curry instance
 * @param className Class or an array of classes to check for
 * @param applyTo Decides wether to check if the condition is true for all, some or none of the selected elements
 * @returns Results of the condition check
 */
export const _hasClass: ClassCheck = function (
  this,
  className,
  applyTo = 'every',
) {
  const results: boolean[] = []
  const modelled: string[]
    = typeof className === 'string' ? [className] : className

  this.nodes.forEach((node: Node) => {
    const el = toEl(node)
    results.push(modelled.some((cls: string) => el.classList.contains(cls)))
  })

  switch (applyTo) {
    case 'some': {
      return results.some(r => r)
    }
    case 'every': {
      return results.every(r => r)
    }
    case 'none': {
      return !results.some(r => r)
    }
  }
}
