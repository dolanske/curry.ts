import { $ } from './curry'
import { delay } from './curry/util'

$('button').click(async () => {
  $(document.body).animate({ height: 0 }, {
    duration: 1000,
    async onStart(animation) {
      // expect(animation.playState).toBe('running')
      console.log(animation.playState)

      await delay(50)

      animation.cancel()
    },
    onCancel(animation, err) {
      // expect(animation.playState).toBe('finished')
      console.log(animation.playState)

      console.log(err)
    },
  })
})
