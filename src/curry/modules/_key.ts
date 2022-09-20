// functions related to keypress events

import { Curry } from ".."
import { EventCallback } from "../types"
import { KeyCodes } from "../keycodes"
import { _on } from "./on"
import { isArray } from "../util"

type KeyboardEvents = "keydown" | "keyup" | "keypress"

type KeyboardKeys = keyof KeyCodes | KeyCodes[keyof KeyCodes]

export interface Key {
  down: (this: Curry, keys: KeyboardKeys, callback?: EventCallback) => void
  up: (this: Curry, keys: KeyboardKeys, callback?: EventCallback) => void
  press: (this: Curry, keys: KeyboardKeys, callback?: EventCallback) => void
}

export const _key: Key = {
  down(this, keys, callback) {
    if (callback) handle.call(this, "keydown", keys, callback)
  },
  up(keys, callback) {
    if (callback) handle.call(this, "keyup", keys, callback)
  },
  press(keys, callback) {
    if (callback) handle.call(this, "keypress", keys, callback)
  }
}


class History {
  this.items = []

  
}

function handle(
  this: Curry,
  type: KeyboardEvents,
  keys: KeyboardKeys,
  callback: EventCallback
) {
  const history: string[] = []

  function setHistory(value: string) {
    history.push(value)
  
    if (history.length > 10) {
      history.shift()
    }
  }

  this.nodes.forEach((node) => {
    node.addEventListener(type, (event: any) => {
      // I dont fucking know ok
      event = event as KeyboardEvent

      console.log(event.key)

      // if ()
    })
  })
}
