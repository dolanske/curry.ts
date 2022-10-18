import { $, Curry } from './curry'

$('#btn').click(function() {
  $(this).next().fadeToggle()
})
