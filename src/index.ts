import { $ } from "./curry"

$("button").hover(function () {
  this.textContent = "cum"
})
