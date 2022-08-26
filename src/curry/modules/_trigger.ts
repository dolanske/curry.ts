import { Curry } from ".."

export type Trigger = (this: Curry, eventName: string, payload?: any) => Curry

/**
 *
 * @param this Curry
 * @param eventName Custom event name
 * @param payload Optional payload which event listener will receive
 * @returns Curry instance
 */

export const _trigger: Trigger = function (this, eventName, payload = {}) {
  this.queue(() => {
    this.nodes.map((node) => {
      const event = new CustomEvent(eventName, { detail: payload })
      node.dispatchEvent(event)
    })
  })

  return this
}
