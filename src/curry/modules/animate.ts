import type { DataType, Properties } from 'csstype'
import type { Curry } from '..'
import { $ } from '..'
import { isArray, toEl } from '../util'

interface Options extends KeyframeAnimationOptions {
  // Callback to execute on animation completion
  onFinish?: (animation: Animation) => void
  // TODO: how to detect if an error happens during an animation
  // onError?: (this: Animation, e: ErrorEvent) => void
  // Wether to return object back to its defaults to apply the styling of the last keyframe
  keepStyle?: boolean
  easing?: DataType.EasingFunction
}

export type Animate = (
  this: Curry,
  animator: Properties | Properties[],
  options?: Options
) => Curry

const defaults: Options = {
  easing: 'linear',
  duration: 300,
  iterations: 1,
  keepStyle: false,
}

/**
 *
 * @param this Curry instance
 * @param animator A keyframe or an array of keyframes
 * @param options Animation options
 * @returns Curry instance for chaining
 */

export const _animate: Animate = function (this, animator, options = {}) {
  this.queue(async () => {
    if (!animator)
      return Promise.resolve()

    const { onFinish, keepStyle } = Object.assign(defaults, options)

    // We use Properties type first to type check correct CSS bindings
    // Then type-cast it as a Keyframe array so the animation method accepts it
    // Convert to array in case only 1 keyframe is provided
    animator = isArray(animator) ? animator : ([animator] as Properties[])

    // NOTE: This is a workaround for animation ignoring the first frame when we unput an array of keyframes.
    // TODO: Test if its required for multiple keyframes
    if (animator.length > 1)
      animator.unshift({})

    const keyframes = animator as Keyframe[]
    const promises: Promise<any>[] = []

    for (const node of this.nodes) {
      const el = toEl(node)

      if (!el.animate)
        return Promise.resolve()

      const animation = el.animate(keyframes, options)

      animation.onfinish = () => {
        // Once animation finishes
        // If we want to keep the last ke
        if (keepStyle) {
          const lastFrame = keyframes.at(-1) as Properties
          $(node).css(lastFrame)
        }

        if (onFinish)
          onFinish(animation)
      }

      animation.oncancel = err => console.log('[$.animate] Animation cancelled \n', err)
      animation.onremove = err => console.log('[$.animate] Animation removed \n', err)

      // Wait until animation completes
      promises.push(animation.finished)
    }

    return Promise.allSettled(promises)
  })

  return this
}
