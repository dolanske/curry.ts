import type { Curry } from '..'
import { isArray, isObject, toEl } from '../util'

export type Primitive = string | number | boolean | null | undefined

export type State = <T extends Record<PropertyKey, any>> (
  this: Curry,
  data: T,
  fn: (this: HTMLElement, data: T, instance: Curry) => void
) => T

/**
 * Create a simple state object state and run DOM updates whenever the state is modified.
 *
 * @param this Curry instance
 * @param data Default state
 * @param onStateUpdate Callback which runs whenever update is changed.
 * @returns Proxied state. Modifying its properties will trigger the callback
 */

export const _state: State = function (this, data, onStateUpdate) {
  if (Object.values(data).some(v => isArray(v) || isObject(v))) {
    throw new Error('You can only provide primitives as state values')
  }

  // Apply base state first
  for (const node of this.nodes)
    onStateUpdate.apply(toEl(node), [data, this])

  // Create proxy object which runs the fn each time a property is set or deleted
  return new Proxy(data, {
    has: (target: typeof data, prop: keyof typeof data) => {
      return Reflect.has(target, prop)
    },
    get: (target: typeof data, prop: keyof typeof data, receiver: any) => {
      return Reflect.get(target, prop, receiver)
    },
    set: (target: typeof data, key: keyof typeof data, value: any, receiver: any) => {
      const result = Reflect.set(target, key, value, receiver)
      for (const node of this.nodes)
        onStateUpdate.apply(toEl(node), [target, this])

      return result
    },
    deleteProperty: (target: typeof data, prop: keyof typeof data) => {
      const result = Reflect.deleteProperty(target, prop)
      for (const node of this.nodes)
        onStateUpdate.apply(toEl(node), [target, this])

      return result
    },
  })
}
