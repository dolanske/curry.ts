import type { Curry } from '..'
import { $ } from '..'
import { toEl } from '../util'

export type Fade = (this: Curry, duration?: number, to?: number,) => void


// fade in

export const _fadeIn: Fade = function (this, duration = 3000, to = 1,) {
  this.queue(() => {
    this.nodes.forEach((node) => {
      $(node).animate([{ opacity: to }], { duration, keepStyle: true })
    })
  })
}

export const _fadeOut: Fade = function (this, duration = 300, to = 0,) {
  this.queue(() => {
    this.nodes.forEach((node) => {
      $(node).animate([{ opacity: to }], { duration, keepStyle: true })
    })
  })
}

// fade toggle

export type FadeToggle = (
  this: Curry,
  duration?: number,
  states?: [number, number]
) => Curry

export const _fadeToggle: FadeToggle = function (this, duration = 300, [off, on] = [0, 1]) {
  this.queue(() => {
    this.nodes.forEach((_node: Node) => {
      // If current node has inline style called opacity at value 
      const node = toEl<HTMLElement>(_node)
      const opacity = parseFloat(node.style.opacity)
      
      console.log(opacity)
      
      if (opacity === 0 || opacity < on) {
        console.log('fade in')
        // We are fading out
        $(node).fadeIn(duration, on)
        
      } else {
        console.log('fade out')
        $(node).fadeOut(duration, off)
        
        // We are fading in
      }
    })
  })

  return this
}