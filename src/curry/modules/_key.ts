// functions related to keypress events

import { $, Curry } from ".."
import { KeyboardeventCallback } from "../types"
import { _on } from "./on"
import { toEl } from "../util"
import { KeyboardEventKey } from "../keycodes"

type KeyboardEvents = "keydown" | "keyup" | "keypress"
type Keys = KeyboardEventKey | KeyboardEventKey[]

export class Key {
  curryInstance: Curry

  constructor(curry: Curry) {
    this.curryInstance = curry
  }

  down(keys: Keys, callback: KeyboardeventCallback) {
    handle.call(this.curryInstance, "keydown", keys, callback)
  }

  up(keys: Keys, callback: KeyboardeventCallback) {
    handle.call(this.curryInstance, "keyup", keys, callback)
  }

  press(keys: Keys, callback: KeyboardeventCallback) {
    handle.call(this.curryInstance, "keypress", keys, callback)
  }
}

class History {
  items: KeyboardEventKey[] = []

  add(item: KeyboardEventKey) {
    this.items.push(item)

    if (this.items.length > 10) {
      this.items.shift()
    }
  }

  pressing(keys: KeyboardEventKey[]) {
    return keys.every(
      (key, index) => this.items.at(keys.length - index + 1 * -1) == key
    )
  }
}

function handle(
  this: Curry,
  type: KeyboardEvents,
  keys: Keys,
  callback: KeyboardeventCallback
) {
  const history = new History()
  const formatKeys: KeyboardEventKey[] = Array.isArray(keys) ? keys : [keys]

  this.nodes.forEach((node) => {
    $(node).on(type, (event: any) => {
      event = event as KeyboardEvent // I dont fucking know ok
      history.add(event.code)

      if (history.pressing(formatKeys)) {
        callback.apply(toEl(node), [event, this])
      }
    })
  })
}
