import type { Properties } from 'csstype'
import type { Curry } from '..'
import { $ } from '..'
import { isArray, toEl } from '../util'

interface Options extends KeyframeAnimationOptions {
  onStart?: (animation: Animation) => void
  onFinish?: (animation: Animation) => void
  onCancel?: (animation: Animation, err: AnimationPlaybackEvent) => void

  keepStyle?: boolean
  // easing?: DataType.EasingFunction
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

    const { onFinish, keepStyle, onStart, onCancel } = Object.assign(defaults, options)

    // We use Properties type first to type check correct CSS bindings
    // Then type-cast it as a Keyframe array so the animation method accepts it
    // Convert to array in case only 1 keyframe is provided
    animator = isArray(animator) ? animator : ([animator] as Properties[])

    // NOTE: This is a workaround for animation ignoring the first frame when we input an array of keyframes.
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

      // Animation started event
      if (onStart)
        onStart(animation)

      animation.onfinish = () => {
        // Animation completed event
        if (onFinish)
          onFinish(animation)

        // Once animation finishes
        // If we want to keep the last ke
        if (keepStyle) {
          const lastFrame = keyframes.at(-1) as Properties
          $(node).css(lastFrame)
        }
      }

      // Animation is manually cancelled
      animation.oncancel = (err) => {
        if (onCancel)
          onCancel(animation, err)
        else
          console.warn('[$.animate] Animation cancelled \n', err)
      }

      // Animation is automatically removed by the browser
      // https://developer.mozilla.org/en-US/docs/Web/API/Animation#automatically_removing_filling_animations
      animation.onremove = err => console.warn('[$.animate] Animation removed by the browser \n', err)

      // Wait until animation completes
      promises.push(animation.finished)
    }

    return Promise.allSettled(promises)
  })

  return this
}
