import { $ } from "./curry"

$("button").click(function () {
  $(this).next().next().toggle()
})
