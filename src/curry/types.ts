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

export type IteratorCallback = (
  this: Element,
  index: number,
  instance: Curry
) => void

export type DynamicObject = { [key: string | number]: any }

export type PrevNextCallback = GenericCallback & { prev: Element }

export type ValueOf<T> = T[keyof T]
