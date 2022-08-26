import { $ } from "./curry"

//@ts-ignore
$("input").key.down("shift", () => {
  console.log("shift")
})
