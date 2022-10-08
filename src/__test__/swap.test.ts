/**
 * @vitest-environment jsdom
 */

import { expect, test } from 'vitest'
import { $ } from '../curry/index'
import { delay } from '../curry/util'

// TODO: find out how to simulate document.querySelector
// FIXME: NOT 100 COVERAGE!!!!!!!

test.skip('Swap two elements', async () => {
  const wrap1 = document.createElement('div')
  wrap1.id = 'wrap1'
  const wrap2 = document.createElement('div')
  wrap2.id = 'wrap2'
  const span1 = document.createElement('span')
  span1.id = 'first'
  const span2 = document.createElement('span')
  span2.id = 'second'

  wrap1.appendChild(span1)
  wrap2.appendChild(span2)

  $(document).swap(span1, span2)

  await delay(10)

  expect(wrap1.children[0]).toStrictEqual(span2)
  expect(wrap2.children[0]).toStrictEqual(span1)

  // All the following calls shoudl do nothing

  $(document).swap(span2, '#first')
  // $(document).swap("#first", span2)
  // $(document).swap("#first", "#second")

  await delay(10)

  expect(wrap1.children[0]).toStrictEqual(span1)
  // expect(wrap2.children[0]).toStrictEqual(span2)
})
