import { $ } from './curry'
import { delay } from './curry/util'

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

$('#btn').click(function () {
  // eslint-disable-next-line no-console
  $(this).run(() => delay(1000)).run(() => console.log('done'))
})
