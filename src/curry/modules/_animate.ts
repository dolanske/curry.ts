import { Curry } from ".."
import type { Properties, PropertiesHyphen } from "csstype"
import { ValueOf } from "../types"

interface CSSStyle extends Properties, PropertiesHyphen {}

// type AnimationObjectProperty = {
//   [key: keyof CSSStyle]: ValueOf<CSSStyle>
// }

// type AnimationOptions = {
//   easing: string
//   length: number
// }

// export type Animate = (
//   this: Curry,
//   animator: AnimationObjectProperty,
//   options: AnimationOptions
// ) => Curry

// export const _animate: Animate = function (this, animator, options) {
//   this.queue(() => {})
// }
