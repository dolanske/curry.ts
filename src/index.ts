import { $, Curry } from "./curry"

$("button").click(function () {
  $(this).add(`<span>NEW CHILD</span>`, "prepend")
})
