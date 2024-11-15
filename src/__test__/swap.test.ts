/**
 * @vitest-environment jsdom
 */

import { describe, expect, it } from 'vitest'
import { $ } from '../curry/index'
import { delay } from '../curry/util'

function prepareDom() {
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

describe('swap two elements', () => {
  it('hTML elements as params', async () => {
    const { wrap1, wrap2, span1, span2 } = prepareDom()

    $(document).swap(span1, span2)
    await delay(5)
    expect(wrap1.firstChild).toStrictEqual(span2)
    expect(wrap2.firstChild).toStrictEqual(span1)
  })

  it('first selector as string', async () => {
    const { wrap1, wrap2, span1, span2 } = prepareDom()

    document.body.replaceChildren()
    document.body.appendChild(wrap1)
    document.body.appendChild(wrap2)

    await $(document, document).swap('#first', span2).get()
    await $(document, document).swap('#nonexistent', span2).get()

    expect(wrap1.firstChild).toStrictEqual(span2)
    expect(wrap2.firstChild).toStrictEqual(span1)
  })

  it('second selector as string', async () => {
    const { wrap1, wrap2, span1, span2 } = prepareDom()

    document.body.replaceChildren()
    document.body.appendChild(wrap1)
    document.body.appendChild(wrap2)

    await $(document, document).swap(span1, '#second').get()
    await $(document, document).swap(span1, '#noneexistent').get()

    expect(wrap1.firstChild).toStrictEqual(span2)
    expect(wrap2.firstChild).toStrictEqual(span1)
  })

  it('swap selected nodes', async () => {
    const { wrap1, wrap2, span2 } = prepareDom()
    document.body.replaceChildren()
    document.body.appendChild(wrap1)
    document.body.appendChild(wrap2)

    await $('#first', document).swap(span2).get()
    expect(wrap1.firstChild).toStrictEqual(span2)
  })
})
