import { $ } from './curry'

$('button').click(async function () {
  const prev = await $(this).prevSiblings().get()
  console.log(prev)

  const next = await $(this).nextSiblings().get()
  console.log(next)
})
