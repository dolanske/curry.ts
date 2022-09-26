import { $ } from "./curry"

$("input").key.down(["Control", "c"], () => {
  console.log("CORRECT")
})
