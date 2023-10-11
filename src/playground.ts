import { $ } from "./curry"
import { delay } from "./curry/util"

function updateLogger() {
  console.log("Resized!!!")
}

$(".wrap").onResize(updateLogger).stopOnResize()

// $(".wrap").css("width", "200px")

await delay(500)

// $(".wrap").css("width", "500px")