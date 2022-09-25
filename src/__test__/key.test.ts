/**
 * @vitest-environment jsdom
 */

import { $, Curry } from "../curry"
import { describe, expect, test } from "vitest"
import type { Key } from "../curry/modules/_key"

describe.skip("Keyboard events handling", () => {
  test("Correct binding of events", async () => {
    $(document).key.press(["a"], () => {
      console.log()
    })
  })
})
