import type { DataType } from 'csstype'
import type { Curry } from '..'
import { $ } from '..'
import { formatPrefixAttr, isObject, toEl } from '../util'

export interface SlideToggleOptions {
  easing?: DataType.EasingFunction
  // In milliseconds
  duration?: number
  // Override works in a way that the Open or Close state gets applied to all
  // selected elements based on the first element. Instead of toggling it
  override?: boolean
}

export type Slide = (this: Curry, duration?: number, easing?: string) => Curry

export const _slideUp: Slide = function (this, duration = 300, easing = 'linear') {
  this.queue(async () => {
    const executions: Promise<any>[] = []

    for (const _node of this.nodes) {
      const node = toEl(_node)
      // Save elements original height so we can perform a smooth animation
      // to it when/if user wants to use slideDown/slideToggle afterwards
      const originalHeight = node.scrollHeight

      executions.push(
        $(node)
          .setAttr(formatPrefixAttr('original-height'), originalHeight)
          .css('overflow', 'hidden')
          .animate({ height: '0px' }, {
            easing,
            duration,
            keepStyle: true,
          })
          .css('display', 'none')
          // Empty get is used to return a promise of the entire chain
          .await,
      )
    }

    return Promise.allSettled(executions)
  })

  return this
}

export const _slideDown: Slide = function (this, duration = 300, easing = 'linear') {
  this.queue(async () => {
    // Store animation promises
    const executions: Promise<any>[] = []

    for (const _node of this.nodes) {
      const node = toEl(_node)
      // Remove display property as it's not needed anymore
      node.style.removeProperty('display')
      // Check if element contains an original height attr()
      const attrHeight = $(node).getAttr(formatPrefixAttr('original-height'))
      // Get the elements inner content height
      const height = `${attrHeight ?? node.scrollHeight}px`

      executions.push(
        $(node)
          // Animate to the inner content's height
          // This will display the animated component in its natural dimensions
          .animate({ height }, { easing, duration })
          .run(() => {
            node.style.removeProperty('overflow')
            node.style.removeProperty('height')
          })
          .setAttr(formatPrefixAttr('original-height'), null)
          .await,
      )
    }

    return Promise.allSettled(executions)
  })

  return this
}

export type SlideToggle = (this: Curry, duration?: number | SlideToggleOptions, easing?: string) => Curry

export const _slideToggle: SlideToggle = function (this, _duration, _easing) {
  this.queue(async () => {
    const {
      duration = 300,
      easing = _easing ?? 'linear',
      override = false,
    } = isObject(_duration) ? _duration : {}

    // Check wether element is currently slid up (hidden) or down (visible)

    const executions: Promise<any>[] = []

    for (const _node of this.nodes) {
      const node = toEl(_node)

      // If is-off is true, it means this action should return the element back
      // to its original state

      // The current element is hidden (most likely slideUp() was called)
      // Override means that if that we treat all selected elements as the first node
      const isOff = override
        ? toEl<HTMLElement>(this.nodes[0]).style.display === 'none'
        : node.style.display === 'none'

      executions.push(isOff
        ? $(node).slideDown(duration, easing).await
        : $(node).slideUp(duration, easing).await,
      )
    }

    return Promise.allSettled(executions)
  })

  return this
}

// REVIEW

// SLide currently supports sliding up (hiding element) and down (showing element)
// This animation is always performed in the same fashion. Essentially the element is wrapped up to its upper
// edge. Now in most cases this is what users want.

// But what if the same animation could be used for the remaining 3 edges? `SlideLeftUp` would mean the element
// is rolled to its left edge. And `SlideLeftDown` would unroll it again.

// Syntax for methods of this amount of complexity would require a bit more verbose syntax.
// Most likely the library could provide all the specific ones such as `SlideLeftDown`, `SlideLeftUp` and `SlideLeftToggle` and so on
// But all of them should just perform a simple call of another function. The main `slide`

// Bellow are the proposed syntax ideas

// Proposed slide
// _slide('Up', { ...options })
// _slide({from: 'Up', to: 'Up'}, { ...options })
// _slide({from: 'Up', to: 'Up', ...options})         // #1 my favorite
// _slide('Up', 'Down')                               // #2.1 Also possible
// _slide('Up', 'Down', { ...options })               // #2.2 Also possible
// _slide('<from>', '<To>')
