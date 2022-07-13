import { $ } from "./curry"

$("button").click(function () {
  // $(this).setAttr([{ title: 100 }, { "data-test": "test" }])

  const attr = $(this).getAttr(["data-title", "id"])

  console.log(attr)
})
