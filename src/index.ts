import { $, Curry } from "./curry"

$("button").click(function () {
  $(this).append(`<span>NEW CHILD</span>`)
})
