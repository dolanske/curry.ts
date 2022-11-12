import type { Curry } from '..'
import { $ } from '..'
import { toEl } from '../util'

export type Fade = (this: Curry, options?: { duration?: number; to?: number }) => Curry

// fade in
export const _fadeIn: Fade = function (this, options) {
  const { duration, to } = Object.assign({
    duration: 300,
    to: 1,
  }, options)

  this.queue(() => {
    this.nodes.forEach((node) => {
      $(node).animate([{ opacity: to }], { duration, keepStyle: true })
    })
  })

  return this
}

export const _fadeOut: Fade = function (this, options) {
  const { duration, to } = Object.assign({
    duration: 300,
    to: 0,
  }, options)

  this.queue(() => {
    this.nodes.forEach((node) => {
      $(node).animate([{ opacity: to }], { duration, keepStyle: true })
    })
  })

  return this
}

// fade toggle

export type FadeToggle = (
  this: Curry,
  options?: number | {
    duration?: number
    off?: number
    on?: number
  },
) => Curry

export const _fadeToggle: FadeToggle = function (this, options = {}) {
  this.queue(() => {
    this.nodes.forEach((_node: Node) => {
      // If current node has inline style called opacity at value
      const node = toEl<HTMLElement>(_node)
      const opacity = parseFloat(node.style.opacity)

      const defaults = {
        duration: 300,
        off: 0,
        on: 1,
      }

      // Serialize options
      if (typeof options === 'number')
        options = { duration: options }

      const { duration, off, on } = Object.assign(defaults, options)

      if (opacity === 0 || opacity < on) // Fade out
        $(node).fadeIn({ duration, to: on })

      else // Fade in
        $(node).fadeOut({ duration, to: off })

      // We are fading in
    })
  })

  return this
}
