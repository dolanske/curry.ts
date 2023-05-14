import { $ } from './curry'

$('button').click(function () {
  $(this).next().slideToggle(500)
})
