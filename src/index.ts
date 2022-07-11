import { $ } from "./curry"

$("button").click(function () {
  this.textContent = "Hello World!"
})
