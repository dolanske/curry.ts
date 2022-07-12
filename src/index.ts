import { $ } from "./curry"

$("span").odd(function () {
  console.log(this.textContent)
})
