import { Curry } from "."

export type GenericCallback = (
  this: Element,
  options: {
    self: Element
    instance: Curry
    index?: number
  }
) => void

export type EventCallback = (
  this: Element,
  event: Event,
  instance: Curry
) => void

export type IteratorCallback<T = void> = (
  this: Element,
  options: {
    self: Element
    instance: Curry
    index: number
  }
) => T

export type DynamicObject = { [key: string | number]: any }

export type PrevNextCallback = (
  this: Element,
  options: {
    self?: Element | null
    prev?: Element | null
    instance: Curry
    index?: number
  }
) => void

export type ValueOf<T> = T[keyof T]

// export type VNode = {
//   tag: string
//   props: DynamicObject
//   children: VNode[] | string | string[]
// }
