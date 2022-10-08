import { $ } from "./curry"

$("#btn").click(() => {
  $("#rect").animate([{ transform: "translateX(200px)" }])
})
