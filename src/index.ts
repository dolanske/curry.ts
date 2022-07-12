import { $ } from "./curry"

$("#app")
  .children()
  .each(function () {
    console.log(this.textContent)
  })
