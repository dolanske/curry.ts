import type { Properties } from 'csstype'
import type { Curry } from '..'
import { $ } from '..'
import { isArray, toEl } from '../util'

// TODO: Animator as a method which exposes all the WebAnimations API methods (destructure the entire animation class?)
// TODO: Add tests

// TODO: fix default option override if any option is used

interface Options extends KeyframeAnimationOptions {
  // Callback to execute on animation completion
  onFinish?: (animation: Animation) => void
  onError?: (this: Animation, e: ErrorEvent) => void
  // Wether to return object back to its defaults to apply the styling of the last keyframe
  keepStyle?: boolean
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

export const _animate: Animate = function (this, animator, options = defaults) {
  this.queue(() => {
    const { onFinish, keepStyle, onError } = options

    // We use Properties type first to type check correct CSS bindings
    // Then type-cast it as a Keyframe array so the animation method accepts it
    animator = isArray(animator) ? animator : ([animator] as Properties[])

    // if (!keepStyle) {
    //   animator.push({})
    // }

    const keyframes = animator as Keyframe[]

    this.nodes.forEach((node) => {
      const el = toEl(node)
      console.log(keyframes)

      const animation = el.animate(keyframes, options)

      animation.finished
        .then(() => {
          // Once animation finishes
          // If we want to keep the last ke
          if (keepStyle) {
            const lastFrame = keyframes.at(-1) as Properties
            $(node).css(lastFrame)
          }
        })
        .catch((e: ErrorEvent) => {
          if (onError)
            onError.call(animation, e)
        })
        .finally(() => {
          if (onFinish)
            onFinish(animation)
        })
    })
  })

  return this
}
