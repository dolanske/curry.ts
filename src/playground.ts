import { $ } from './curry'

$('button').click(async function () {
  const start = performance.now()
  await $(this).next().animate({ height: '500px' }, { duration: 500, keepStyle: true }).await
  const end = performance.now()
  console.log(end - start)
})
