import type { Curry } from '..'
import { $ } from '..'
import { toEl } from '../util'

// Slide option works two ways
// The base and the endState
// Meaning UpOpen starts up and slides down to open
// Then UpClose

// The state is determind if the element we are performing slide
// on has a style property display:false;

type SlideType = 'Up' | 'Down' | 'Left' | 'Right'
interface SlideOptions {
  easing?: string
  // In milliseconds
  duration?: number
  // Override works in a way that the Open or Close state gets applied to all
  // selected elements based on the first element. Instead of toggling it
  override?: boolean
}
export type Slide = (this: Curry, type: SlideType, options?: SlideOptions) => Curry

// Generic slide method containing all types
export const _slide: Slide = function (this, type, options) {
  this.queue(async () => {
    // Set defaults
    const {
      easing = 'linear',
      duration = 300,
      override = false,
    } = options ?? {}

    for (const _node of this.nodes) {
      const node = toEl<HTMLElement>(_node)
      const isOff = override
        ? toEl<HTMLElement>(this.nodes[0]).style.display === 'none'
        : node.style.display === 'none'

      // If isOff is true, it means this action should return the element back
      // to its original state
      if (isOff) {
        // First remove the display property
        node.style.removeProperty('display')
        // Animate back to normal scale
        await $(node).animate({ transform: 'scale(1,1)' }, {
          onFinish() {
            // Remove transform origin which is used by the animation
            node.style.removeProperty('transform-origin')
          },
        }).get()
      }
      else {
        switch (type) {
          case 'Up': {
            // If it is not off, we want to get into the ON state
            $(node).css('transform-origin', 'center top')
            $(node).animate({ transform: 'scale(1,0)' }, {
              easing,
              duration,
              keepStyle: true,
              onFinish() {
                $(node).css({ display: 'none' })
              },
            })
            break
          }
        }
      }
    }
  })

  return this
}

export function slideUp(this: Curry, duration = 300, easing = 'linear'): Slide {
  this.queue(async () => {
    for (const _node of this.nodes) {
      const inst = $(toEl<HTMLElement>(_node))
      inst.css('overflow', 'hidden')
      inst.animate({
        height: 0,
      }, {
        easing,
        duration,
        onFinish() {
          inst.css('display', 'none')
        },
      })
    }
  })

  return this
}

export function slideDown() {

}

export function slideToggle() {

}
// Slide up

// Slide toggle

// SlideLeftUp

// SlideLeftDown

// SlideLeftToggle

// Slides
// _slide('Up', {})
// _slide({from: 'Up', to: 'Up'}, {})
// _slide('Up', 'Down')
// _slide('Up', 'Down', {})
// _slide('<from>', '<To>')
