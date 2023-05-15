import type { DataType } from 'csstype'
import type { Curry } from '..'
import { $ } from '..'
import { toEl } from '../util'

export type Fade = (this: Curry, options?: {
  duration?: number
  to?: number
  easing?: DataType.EasingFunction
}) => Curry

/**
 * Fades element into full view or the selected `to` value >0
 *
 * @param this Curry instance
 * @param options Fade options
 * @returns Curry instance for chaining
 */

export const _fadeIn: Fade = function (this, options) {
  const { duration, to, easing } = Object.assign({
    duration: 300,
    to: 1,
    easing: 'linear',
  }, options)

  this.queue(() => {
    for (const node of this.nodes)
      $(node).animate([{ opacity: to }], { duration, easing, keepStyle: true })
  })

  return this
}

/**
 * Fades element out of view or the selected `to` value <1
 *
 * @param this Curry instance
 * @param options Fade opitons
 * @returns Curry instance for chaining
 */

export const _fadeOut: Fade = function (this, options) {
  const { duration, to, easing } = Object.assign({
    duration: 300,
    to: 0,
    easing: 'linear',
  }, options)

  this.queue(() => {
    for (const node of this.nodes)
      $(node).animate([{ opacity: to }], { duration, easing, keepStyle: true })
  })

  return this
}

export type FadeToggle = (
  this: Curry,
  options?: number | {
    duration?: number
    off?: number
    on?: number
    easing?: DataType.EasingFunction
  },
) => Curry

/**
 * Toggle between fade states or provided `on` and `off` states
 *
 * @param this Curry instance
 * @param options Fade opitons
 * @returns Curry instance for chaining
 */

export const _fadeToggle: FadeToggle = function (this, options = {}) {
  this.queue(() => {
    for (const _node of this.nodes) {
      // If current node has inline style called opacity at value
      const node = toEl<HTMLElement>(_node)
      const opacity = parseFloat(node.style.opacity)

      const defaults = {
        duration: 300,
        off: 0,
        on: 1,
        easing: 'linear',
      }

      // Serialize options
      if (typeof options === 'number')
        options = { duration: options }

      const { duration, off, on, easing } = Object.assign(defaults, options)

      if (opacity === 0 || opacity < on) // Fade out
        $(node).fadeIn({ duration, to: on, easing })

      else
        $(node).fadeOut({ duration, to: off, easing })
    }
  })

  return this
}
