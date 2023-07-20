import type { Curry } from '..'
import { toEl } from '../util'

export type Primitive = string | number | boolean | null | undefined
export type BindFn<T> = (this: HTMLElement, obj: T, instance: Curry) => void
export type RawObject = Record<PropertyKey, Primitive>
export type Bind = <T extends RawObject>(this: Curry, data: T, fn: BindFn<T>) => T

export const _bind: Bind = function (this, data, fn) {
  // Apply base state first
  for (const node of this.nodes)
    fn.apply(toEl(node), [data, this])

  // Create proxy object which runs the fn each time a property is set or deleted
  return new Proxy(data, {
    get: (target: typeof data, prop: keyof typeof data, receiver: any) => {
      return Reflect.get(target, prop, receiver)
    },
    set: (target: typeof data, key: keyof typeof data, value: any, receiver: any) => {
      const result = Reflect.set(target, key, value, receiver)
      for (const node of this.nodes)
        fn.apply(toEl(node), [target, this])

      return result
    },
    deleteProperty: (target: typeof data, prop: keyof typeof data) => {
      const result = Reflect.deleteProperty(target, prop)
      for (const node of this.nodes)
        fn.apply(toEl(node), [target, this])

      return result
    },
  })
}
