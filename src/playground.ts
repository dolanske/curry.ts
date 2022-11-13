import { $ } from './curry'

$('#btn').click(function () {
  // $(this).next().fadeToggle({ off: 0.2, on: 0.7 })

  const start = performance.now()
  $(this).next().animate([{ opacity: 0, color: 'white' }, { opacity: 1, color: 'red' }], {
    duration: 300 * 4,
    keepStyle: true,
    // onFinish: () => {
    //   console.log('????/')
    // },
  }).run(() => {
    console.log(performance.now() - start)
  })
})
