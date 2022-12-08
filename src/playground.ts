import { $, Curry } from './curry'

declare module './curry' {
  interface Curry {
    getNodesTextContent(this: Curry): void
  }
}

Curry.$fn('getNodesTextContent', function () {
  for (const node of this.nodes)
    node.textContent += ' LOL'
})

// Note: this code works. I just don't know how to make typescript happy :(
$('button').getNodesTextContent()

// SECTION: Test animation

// $('#btn').click(function () {
//   const start = performance.now()
//   $(this).next().animate([{ opacity: 0, color: 'white' }, { opacity: 1, color: 'red' }], {
//     duration: 300 * 4,
//     keepStyle: true,
//   }).run(() => {
//     console.log(performance.now() - start)
//   })
// })

// SECTION: Test chaining async runs

// $('#btn').click(function () {
//   // eslint-disable-next-line no-console
//   $(this).run(() => delay(1000)).run(() => console.log('done'))
// })
