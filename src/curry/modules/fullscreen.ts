import type { Curry } from '..'
import { isObject, toEl } from '../util'

type MergedOptions = FullscreenOptions & {
  onOpen?: (this: string | Element | Node) => void
  onError?: (this: string | Element | Node, error: Error) => void
}

export type StaticFullscreen = (
  target: string | Element | Node,
  options?: MergedOptions,
  doc?: Document
) => Promise<void>

export type Fullscreen = (
  this: Curry,
  target?: string | Element | Node | MergedOptions,
  options?: MergedOptions
) => void

/**
 *
 * @param target Target element which will be the wrapper for fullscreen layout
 * @returns Promise which resolves if fullscreen opens
 */

export const _staticFullscreen: StaticFullscreen = async function (target, options, doc) {
  const _document = doc ?? document

  if (typeof target === 'string') {
    const _target = _document.querySelector(target)
    if (!_target)
      return Promise.reject(new Error('[$.fullscreen] Target does not exist'))
    target = _target
  }

  if (target) {
    // Make sure use implement the Element interface
    const parsed = toEl<Element>(target)

    if (!Object.hasOwn(target, 'requestFullscreen'))
      return Promise.reject(new Error('[$.fullscreen] Target does not implement the fullscreen API'))

    // If true, meaning there already is something fullscreen
    if (_document.fullscreenElement)
      _document.exitFullscreen()

    return parsed.requestFullscreen(options)
      .then(() => {
        if (options?.onOpen)
          options?.onOpen.apply(target)
      })
      .catch(e => options?.onError
        ? options?.onError.apply(target, [e])
        : Promise.reject(new Error('[$.fullscreen] Error during initialization.')),
      )
  }

  return Promise.reject(new Error('[$.fullscreen] Target does not exist'))
}

/**
 *
 * @param this Curry instance
 * @param target Target element which will be the wrapper for fullscreen layout
 * @returns Curry instance
 */

export const _fullscreen: Fullscreen = function (this, target, options) {
  this.queue(() => {
    // If target is a normal object, we can assume it is an options object
    if (isObject(target)) {
      options = target as MergedOptions
      target = this.nodes[0]
    }
    else {
      target ??= this.nodes[0]
    }

    return _staticFullscreen(target, options, this.doc)
  })
  return this
}
