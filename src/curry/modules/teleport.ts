import { Curry } from ".."

export type Teleport = (this: Curry, destination: Element | string) => Curry

export const _teleport: Teleport = function (this, destination) {
  const teleportTo =
    typeof destination === "string"
      ? document.querySelector(destination)
      : destination

  this.nodes.forEach((node) => {
    teleportTo?.appendChild(node)
  })

  return this
}
