import { $ } from "./curry"

$("button").click(function () {
  $(this).css("color", "red")
})
