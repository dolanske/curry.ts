import { $, Curry } from "./curry"

const el = document.createElement("div")
const app = document.getElementById("app")
if (app) {
  app.appendChild(el)
}

const { text } = Curry
text(el, "TEST")
