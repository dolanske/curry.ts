/**
 * @vitest-environment jsdom
 */

import { describe, expect, test } from 'vitest'
import { $, Curry } from '../curry/index'
import { delay } from '../curry/util'

// TODO: find out how to simulate document.querySelector
// FIXME: NOT 100 COVERAGE!!!!!!!

function prepare() {
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

  return {
    wrap1,
    wrap2,
    span1,
    span2,
  }
}

describe('Swap two elements', () => {
  test('HTML elements as params', async () => {
    const { wrap1, wrap2, span1, span2 } = prepare()

    $(document).swap(span1, span2)
    await delay(5)
    expect(wrap1.firstChild).toStrictEqual(span2)
    expect(wrap2.firstChild).toStrictEqual(span1)
  })

  // FIXME: figure out
  test.skip('Selectors as params', async () => {
    const { wrap1, wrap2, span1, span2 } = prepare()

    $(document).swap('#first', span2)
    await delay(5)
    expect(wrap1.firstChild).toStrictEqual(span2)
    expect(wrap2.firstChild).toStrictEqual(span1)

    Curry.swap(span2, '#first')
    await delay(5)
    expect(wrap1.firstChild).toStrictEqual(span2)
    expect(wrap2.firstChild).toStrictEqual(span1)

    // $(document).swap("#first", span2)
    // $(document).swap("#first", "#second")
  })
})

