/**
 * API for view transition
 */

import type { Curry } from '..'

// TODO: remove when ViewTransition API is standardized
// Missing type declarations

interface ViewTransition {
  finished: Promise<void>
  ready: Promise<void>
  updateCallbackDone: Promise<void>
}

declare global {
  interface Document {
    startViewTransition(setupPromise: () => Promise<void> | void): ViewTransition
  }
}

// Curry types

type TransitionLifecycle = (transition: ViewTransition) => void

interface TransitionCallbackOptions {
  self: Node
  /**
   * Runs once the pseudo-element tree is created and the transition animation is about to start.
   */
  onReady: (cb: TransitionLifecycle) => void
  /**
   * Runs once the transition animation is finished, and the new page view is visible and interactive to the user.
   */
  onFinished: (cb: TransitionLifecycle) => void
  /**
   * Runs when the promise returned by the document.startViewTransition()'s callback fulfills.
   */
  onCallbackUpdate: (cb: TransitionLifecycle) => void
}

type Transition = (
  this: Curry,
  cb: (options: TransitionCallbackOptions) => void
) => Curry

/**
 * Transition the state of the DOM to the newly created state inside the callback.
 *
 * @param this Curry instance
 * @param cb Callback in which you can create the updated DOM state
 * @returns Curry instance for chaining
 */
export const _transition: Transition = function (this, cb) {
  this.queue(() => {
    return new Promise((resolve) => {
      if (!('startViewTransition' in document))
        return console.warn('Unsupported API - View Transition')

      const onReadyCbs: TransitionLifecycle[] = []
      const onFinishedCbs: TransitionLifecycle[] = []
      const onCallbackUpdateCbs: TransitionLifecycle[] = []

      const onReady: TransitionCallbackOptions['onReady'] = (cb: TransitionLifecycle) => onReadyCbs.push(cb)
      const onFinished: TransitionCallbackOptions['onFinished'] = (cb: TransitionLifecycle) => onFinishedCbs.push(cb)
      const onCallbackUpdate: TransitionCallbackOptions['onCallbackUpdate'] = (cb: TransitionLifecycle) => onCallbackUpdateCbs.push(cb)

      const transitionInstance = document.startViewTransition(() => {
        for (const node of this.nodes) {
          cb.call(node, {
            onReady,
            onFinished,
            onCallbackUpdate,
            self: node,
          })
        }
      })

      // Can be used to start the custom transition
      transitionInstance.ready.then(() => {
        onReadyCbs.forEach(cb => cb(transitionInstance))
      })

      transitionInstance.finished.then(() => {
        onFinishedCbs.forEach(cb => cb(transitionInstance))

        // SECTION Continue chain once transition completes
        resolve(true)
      })

      transitionInstance.updateCallbackDone.then(() => {
        onCallbackUpdateCbs.forEach(cb => cb(transitionInstance))
      })
    })
  })

  return this
}

// Exmple usage
// $('elemenet').transition(function({ onReady, onFinished, onCallbackUpdate }) {
//   // Update the ELEMENT in any way
//   $(this).css('color', 'blue')

//   // Callback for when transition is ready
//   onReady((transition) => {
//     transition.stop()
//   })

//   // Callback when transition completes
//   onFinished(() => {

//   })
// })

// $('button').click().wait(300).transition(({ self }) => {
//   $(self).css('width', 500)
// })
