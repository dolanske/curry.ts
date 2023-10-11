import { $ } from './curry'
import { delay } from './curry/util'

function updateLogger() {
  console.log('Updated')

}

$('span').onMutate(updateLogger).stopOnMutate()

await delay(500)

$('span').text('cum')

await delay(500)

$('span').text('PLUM')