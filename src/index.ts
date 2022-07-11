import { $ } from "./curry"

$("button").click(function () {
  $(this).tglClass(["red", "blue"])
})
