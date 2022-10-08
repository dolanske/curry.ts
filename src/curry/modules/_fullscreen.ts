import type { Curry } from '..'
import { toEl } from '../util'

// TODO: Add tests for all cases
// TODO: Figure out how to handle errors for non-static use of fullscreen
// - extend options with onOpen & onError

export type StaticFullscreen = (
  target: string | Element | Node,
  options?: FullscreenOptions
) => Promise<void>

export type Fullscreen = (
  this: Curry,
  target?: string | Element | Node,
  options?: FullscreenOptions
) => void

/**
 *
 * @param target Target element which will be the wrapper for fullscreen layout
 * @returns Promise which resolves if fullscreen opens
 */

export const _staticFullscreen: StaticFullscreen = function (target, options) {
  if (typeof target === 'string') {
    const _target = document.querySelector(target)
    if (!_target)
      return Promise.reject(Error('[$.fullscreen] Target does not exist'))
    target = _target
  }

  if (target) {
    // Make sure we implement the Element interface
    const parsed = toEl<Element>(target)
    const allowed = parsed.requestFullscreen(options)

    return allowed
  }

  return Promise.reject(Error('[$.fullscreen] Target does not exist'))
}

/**
 *
 * @param this Curry instance
 * @param target Target element which will be the wrapper for fullscreen layout
 * @returns Curry instance
 */

export const _fullscreen: Fullscreen = function (this, target, options) {
  this.queue(() => _staticFullscreen(target ?? this.nodes[0], options))
  return this
}
