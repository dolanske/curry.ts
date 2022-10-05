import { Curry } from ".."
import type { Properties } from "csstype"
import { isArray } from "../util"

// interface CSSStyle extends Properties {}

type AnimationObjectProperty = Properties

type AnimationOptions = {
  easing: string
  length: number
}

export type Animate = (
  this: Curry,
  animator: AnimationObjectProperty | AnimationObjectProperty[],
  options?: AnimationOptions
) => Curry

const defaults: AnimationOptions = {}

export const _animate: Animate = function (this, animator, options) {
  this.queue(() => {
    // Convert object to set of keyframes
    if (!isArray(animator)) animator = [animator]
  })

  return this
}
