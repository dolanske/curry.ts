import { Curry } from "..";

export type OnResize = (
  this: Curry,
  fn: (target: Element | SVGElement),
  options?: ResizeObserverOptions
) => Curry

export const _onResize: OnResize = function (this, fn, options) {
  this.queue(async () => {
    return new Promise((resolve) => {

    })
  })

  return this
}