import { $, Curry } from ".."

export type Fade = (this: Curry, to: number, duration: number) => void

// fade in

export const _fadeIn: Fade = function (this, to = 1, duration = 3000) {
  this.queue(() => {
    this.nodes.forEach((node) => {
      $(node).animate([{ opacity: to }], { duration })
    })
  })
}

// fade out

export const _fadeOut: Fade = function (this, to = 0, duration = 300) {
  this.queue(() => {
    this.nodes.forEach((node) => {
      $(node).animate([{ opacity: to }], { duration })
    })
  })
}

// fade toggle
