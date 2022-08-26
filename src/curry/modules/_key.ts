// // functions related to keypress events

// import { Curry } from ".."
// import { EventCallback } from "../types"
// import { KeyCodes } from "../keycodes"
// import { _on } from "./on"
// import { isArray } from "../util"

// // export type KeyboardEvents = {
// //   down: (this: Curry, callback: EventCallback) => void
// //   up: (this: Curry, callback: EventCallback) => void
// //   press: (this: Curry, callback: EventCallback) => void
// // }

// // export type Key = {
// //   [key in keyof KeyCodes]: KeyboardEvents
// // }

// type KeyboardEvents = "keydown" | "keyup" | "keypress"

// type KeyboardKeys = keyof KeyCodes | KeyCodes[keyof KeyCodes]

// export interface Key {
//   down: (this: Curry, keys: KeyboardKeys, callback?: EventCallback) => void
//   up: (this: Curry, keys: KeyboardKeys, callback?: EventCallback) => void
//   press: (this: Curry, keys: KeyboardKeys, callback?: EventCallback) => void
// }

// export const _key: Key = {
//   down(keys, callback) {
//     if (callback) handle.call(this, "keydown", keys, callback)
//   },
//   up(keys, callback) {
//     if (callback) handle.call(this, "keyup", keys, callback)
//   },
//   press(keys, callback) {
//     if (callback) handle.call(this, "keypress", keys, callback)
//   }
// }

// function handle(
//   this: Curry,
//   type: KeyboardEvents,
//   keys: KeyboardKeys,
//   callback: EventCallback
// ) {
//   // console.log(this)

//   if (isArray(keys)) {
//     // keys = keys.map((key) => key.toLowerCase())
//   }

//   // const pressed: KeyboardKeys[] = []

//   _on.call(this, type, (event: KeyboardEventInit) => {
//     console.log(event)
//     callback()

//     // const key: keyof KeyboardKeys = event.code?.toLowerCase()
//     // pressed.push(key)
//     // const keyCode = event.which
//   })

//   // this.nodes.forEach((node: Node) =>{
//   //   node.addEventListener(type, (e) => {

//   //   }
//   // })

//   // $(this.nodes).on(type, function (event : KeyboardEvent) {
//   //   // TODO: support for keyCodes, not just key

//   //   pressed.push(event.keyCode)
//   //   console.log(event)
//   // })
// }
