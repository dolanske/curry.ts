import { $ } from './curry'

$('#btn').click(function () {
  // $(this).next().fadeToggle({ off: 0.2, on: 0.7 })
  $(this).next().animate({ opacity: 0 }, {
    duration: 300,
    // onFinish: () => {
    //   console.log('????/')
    // },
  })
})
