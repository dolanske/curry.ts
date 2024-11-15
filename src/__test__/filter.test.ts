/**
 * @vitest-environment jsdom
 */

import { describe, expect, it } from 'vitest'
import { $, Curry } from '../curry/index'

describe('filter element selection', () => {
  // Prepare DOM stuff
  const div = document.createElement('div')
  for (let i = 0; i < 4; i++) {
    const span = document.createElement('span')
    span.id = `span${i}`
    div.appendChild(span)
  }

  it('filter on selected elements with callback function', async () => {
    const filtered = await $(div)
      .children()
      .filter(function ({ self, index, instance }) {
        expect(self).toStrictEqual(div.children[index])
        expect(instance).toBeInstanceOf(Curry)

        return this.id === 'span1'
      })
      .get()

    expect(filtered).toStrictEqual([div.children[1]])
  })

  it('filter on selected elements with 1 rule', async () => {
    const filtered = await $(div).children().filter('#span2').get()
    expect(filtered).toStrictEqual([div.children[2]])
  })

  it('filter on selected elements with set of rules', async () => {
    // Filters with returned values
    const filtered1 = await $(div)
      .children()
      .filter(['#span0', '#span2'], 'some')
      .get()

    const filtered2 = await $(div).children().filter(['#span0'], 'every').get()

    const filtered3 = await $(div)
      .children()
      .filter(['#span0', '#span2'], 'none')
      .get()

    expect(filtered1).toStrictEqual([div.children[0], div.children[2]])
    expect(filtered2).toStrictEqual([div.children[0]])
    expect(filtered3).toStrictEqual([div.children[1], div.children[3]])

    // Filters returning undeinfed

    const none1 = await $(div).children().filter(['test'], 'every').get()
    const none2 = await $(div).children().filter(['test'], 'some').get()
    const none3 = await $(div)
      .children()
      .filter(['#span0', '#span1', '#span2', '#span3'], 'none')
      .get()

    expect(none1).toBeUndefined()
    expect(none2).toBeUndefined()
    expect(none3).toBeUndefined()
  })
})
