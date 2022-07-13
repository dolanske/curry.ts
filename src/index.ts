import { $ } from "./curry"

$("button").click(function () {
  $("span").teleport("#app")
})
