import { $ } from "./curry"

$("span").asyncEach(function (next, { index }) {
  console.log(index)
  setTimeout(() => next(), 500)
})
