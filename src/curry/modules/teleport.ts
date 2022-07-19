import { Curry } from ".."

export type Teleport = (this: Curry, destination: Element | string) => Curry

/**
 *
 * @param this Curry instance
 * @param destination Element to teleport selected elemnents to
 * @returns Curry instance for optional chaining
 */

export const _teleport: Teleport = function (this, destination) {
  this.queue(() => {
    const teleportTo =
      typeof destination === "string"
        ? document.querySelector(destination)
        : destination

    this.nodes.forEach((node) => {
      teleportTo?.appendChild(node)
    })
  })

  return this
}
