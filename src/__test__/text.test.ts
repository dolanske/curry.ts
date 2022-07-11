import { expect, test } from "vitest";
import { $ } from "../curry/index";

import { JSDOM } from "jsdom";

test("$.text()", () => {
  const document = new JSDOM().window.document;
  // Mock a DOM element.
  const span = document.createElement("span");
  span.innerText = "Hello World";
  document.body.appendChild(span);

  expect($("span").nodes[0]).toBe(span);
});
