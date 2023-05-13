import { $ } from './curry'

$('button').click((event, instance) => {
  instance.slide('Down')
})
