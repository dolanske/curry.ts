// functions related to keypress events

import { $, Curry } from ".."
import { KeyboardeventCallback } from "../types"
import { _on } from "./on"
import { toEl } from "../util"
import { KeyboardEventKey } from "../keycodes"

type KeyboardEvents = "keydown" | "keyup" | "keypress"
type Keys = KeyboardEventKey | KeyboardEventKey[]

/**
 * Wrapper for DOM keyboard events
 */

export class Key {
  curryInstance: Curry

  constructor(curry: Curry) {
    this.curryInstance = curry
  }

  /**
   * Same as addEventListener('keydown')
   *
   * @param keys Key or an array of keys (use capital letters for functional keys)
   * @param callback  Executed when the key(s) is/are pressed in the exact order
   */

  down(keys: Keys, callback: KeyboardeventCallback) {
    handle.call(this.curryInstance, "keydown", keys, callback)
  }

  /**
   * Same as addEventListener('keyup')
   *
   * @param keys Key or an array of keys (use capital letters for functional keys)
   * @param callback  Executed when the key(s) is/are pressed in the exact order
   */

  up(keys: Keys, callback: KeyboardeventCallback) {
    handle.call(this.curryInstance, "keyup", keys, callback)
  }

  /**
   * Same as addEventListener('keypress')
   *
   * @param keys Key or an array of keys (use capital letters for functional keys)
   * @param callback  Executed when the key(s) is/are pressed in the exact order
   */

  press(keys: Keys, callback: KeyboardeventCallback) {
    handle.call(this.curryInstance, "keypress", keys, callback)
  }
}

class History {
  registry: KeyboardEventKey[] = []
  max = 0

  constructor(max: number = 10) {
    this.max = max
  }

  // Add a new key press to the registry
  add(item: KeyboardEventKey) {
    this.registry.push(item)

    // Truncate registry to the amount of keys we are checking for
    // That way we don't end up with a very long array of useless
    // key data
    if (this.registry.length > this.max) {
      this.registry.shift()
    }
  }

  pressing(keys: KeyboardEventKey[]) {
    // Compares keys we are checking for with the latest entries in the registry

    // For example
    // ["Shift", "A"] Match we're checking for
    // ["b", "Shift", "A"] = matches
    // ["b", "Shift", "A", "d"] = does not match

    return keys.every(
      (key, index) => this.registry.at(index - keys.length) === key
    )
  }
}

function handle(
  this: Curry,
  type: KeyboardEvents,
  keys: Keys,
  callback: KeyboardeventCallback
) {
  const formatKeys: KeyboardEventKey[] = Array.isArray(keys) ? keys : [keys]
  const history = new History(formatKeys.length)

  this.nodes.forEach((node) => {
    $(node).on(type, (event: any) => {
      // We know the event will always be a keyboard event
      event = event as KeyboardEvent
      history.add(event.key)

      if (history.pressing(formatKeys)) {
        callback.apply(toEl(node), [event, this])
      }
    })
  })
}
