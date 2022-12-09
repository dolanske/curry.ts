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
  easing: string
  duration: number
  // Override works in a way that the Open or Close state gets applied to all
  // selected elements based on the first element. Instead of toggling it
  override?: boolean
}
type Slide = (this: Curry, type: SlideType, options: SlideOptions) => Curry

// Slide down
export const slide: Slide = function (this, type, { easing, duration, override }) {
  this.queue(async () => {
    for (const _node of this.nodes) {
      const node = toEl<HTMLElement>(_node)
      const isOff = override
        ? toEl<HTMLElement>(this.nodes[0]).style.display === 'node'
        : node.style.display === 'none'

      switch (type) {
        case 'Up': {
          // If it is not off, we want to get into the ON state
          if (!isOff) {
            $(node).css('transform-origin', 'center top')
            $(node).animate({ transform: 'scale(1,0)' }, {
              easing,
              duration,
              keepStyle: true,
              onFinish() {
                $(node).css({ display: 'none' })
              },
            })
          }
        }

        // default: {
        //   // We just completed the Close animation back to the default
        //   if (!isOff)
        //     $(node).animate({ transform: 'scale(1,1)' })
        //   $(node).css('transform-origin', 'inherit')
        // }
      }
    }
  })

  return this
}

// Slide up

// Slide toggle

// SlideLeftUp

// SlideLeftDown

// SlideLeftToggle

// All of the above can have "reverse" boolean which will reverse the side of the animation
