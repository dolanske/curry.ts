import { $ } from './curry'

$('button').click((_, instance) => {
  instance.next().slide('Up')
})
