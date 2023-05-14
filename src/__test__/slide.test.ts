/**
 * @vitest-environment jsdom
 */

import { describe, expect, test } from "vitest";
import { $ } from "../curry";

// describe('$.slide() methods', () => {
//   test('slideDown', () => {
//     const el = document.createElement('div')
//     el.height
//     document.body.appendChild(el)

//     $(document.body.children[0]).slideUp().get()
//       .then(() => {
//         expect(el.style.getPropertyValue('height')).toStrictEqual(50)
//       })

//   })
// })