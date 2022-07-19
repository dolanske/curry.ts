import { $ } from "./curry"

// $("span")
//   .asyncEach(function (r) {
//     setTimeout(() => {
//       console.log($(this).getAttr("id"))
//       r()
//     }, 1000)
//   })
//   .text("Completed")

const child = await $("#app").children().last().get()

console.log(child)
