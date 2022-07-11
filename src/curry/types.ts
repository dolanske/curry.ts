import { Curry } from "."

export interface GenericCallback {
  self: Node
}

export type EventCallback = (
  this: Element,
  event: Event,
  instance: Curry
) => void

export type DynamicObject = { [key: string | number]: any }
