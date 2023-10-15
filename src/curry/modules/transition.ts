/**
 * API for view transition
 */

import { $, Curry } from ".."

type TransitionLifecycle = (transition: ViewTransitionInstance) => void

interface TransitionCallback {
  self: Node
  /**
   * Runs once the pseudo-element tree is created and the transition animation is about to start.
   */
  onReady: TransitionLifecycle
  /**
   * Runs once the transition animation is finished, and the new page view is visible and interactive to the user.
   */
  onFinished: TransitionLifecycle
  /**
   * Runs when the promise returned by the document.startViewTransition()'s callback fulfills.
   */
  onCallbackUpdate: TransitionLifecycle
}

type Transition = (
  this: Curry,
  cb: ({}: TransitionCallback) => void
)=> Curry

/**
 * Transition the state of the DOM to the newly created state inside the callback.
 * 
 * @param this Curry instance
 * @param cb Callback in which you can create the updated DOM state
 * @returns Curry instance for chaining
 */
export const _transition: Transition = function(this, cb) {
  this.queue(() => {
    if (!('startViewTransition' in document)) {
      return console.warn("Unsupported API - View Transition")
    }

    const onReadyCbs:TransitionLifecycle[] = []
    const onFinishedCbs:TransitionLifecycle[] = []
    const onCallbackUpdateCbs: TransitionLifecycle[] = []

    const onReady = (cb: TransitionLifecycle) => onReadyCbs.push(cb)
    const onFinished = (cb: TransitionLifecycle) => onFinishedCbs.push(cb)
    const onCallbackUpdate = (cb: TransitionLifecycle) => onCallbackUpdateCbs.push(cb)

    const transitionInstance = document.startViewTransition(() => {
      for (const node of this.nodes) {
        cb.call(node, {
          onReady,
          onFinished,
          onCallbackUpdate,
          self: node
        })
      }
    });

    // Can be used to start the custom transition
    transitionInstance.ready.then(() => {
      onReadyCbs.forEach(cb => cb(transitionInstance))
    })

    transitionInstance.finished.then(() => {
      onFinishedCbs.forEach(cb => cb(transitionInstance))
    })

    transitionInstance.updateCallbackDone.then(() => {
      onCallbackUpdateCbs.forEach(cb => cb(transitionInstance))
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