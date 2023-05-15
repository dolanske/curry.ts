import type { Curry } from '.'

export type GenericCallback = (
  this: HTMLElement,
  options: {
    self: HTMLElement
    instance: Curry
    index?: number
  }
) => void

interface CustomEventProperty extends Event {
  detail?: any
}

export type EventCallback = (
  this: HTMLElement,
  event: CustomEventProperty,
  instance: Curry
) => void

export type KeyboardeventCallback = (
  this: HTMLElement,
  event: KeyboardEvent,
  instance: Curry
) => void

export type IteratorCallback<T = void> = (
  this: HTMLElement,
  options: {
    self: HTMLElement
    instance: Curry
    index: number
  }
) => T

export interface DynamicObject { [key: string | number]: any }

export type PrevNextCallback = (
  this: HTMLElement,
  options: {
    self?: HTMLElement | null
    prev?: HTMLElement | null
    instance: Curry
    index?: number
  }
) => void

export type ValueOf<T> = T[keyof T]
