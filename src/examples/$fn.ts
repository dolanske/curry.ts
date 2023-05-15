import { $, Curry } from '../curry'

// Create custom methods for Curry
// This decladarion should be made in the main entrypoint of your project

declare module '../curry' {
  interface Curry {
    appendNodeText(this: Curry): void
  }
}

Curry.$fn('appendNodeText', function () {
  for (const node of this.nodes)
    node.textContent += ' LOL'
})

$('button').appendNodeText()
