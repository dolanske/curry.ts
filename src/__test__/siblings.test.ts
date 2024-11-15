/**
 * @vitest-environment jsdom
 */

import { describe, expect, it } from 'vitest'
import { $ } from '../curry'

describe('selecting siblings', async () => {
  const first = document.createElement('div')
  first.id = 'first'

  const second = document.createElement('div')
  second.id = 'second'

  const third = document.createElement('div')
  third.id = 'third'

  document.body.appendChild(first)
  document.body.appendChild(second)
  document.body.appendChild(third)

  it('selecting all siblings', async () => {
    const all = await $(second).siblings().get()
    expect(all).toStrictEqual([first, third])

    // With a specific selector
    const filtered = await $(second).siblings('#first').get()
    expect(filtered).toStrictEqual([first])
  })

  it('selecting previous siblings', async () => {
    const elements = await $(third).prevSiblings().get()
    expect(elements).toStrictEqual([first, second])

    // With a specific selector
    const filtered = await $(second).prevSiblings('#third').get()
    expect(filtered).toBeUndefined()
  })

  it('selecting next siblings', async () => {
    const elements = await $(first).nextSiblings().get()
    expect(elements).toStrictEqual([second, third])

    // With a specific selector
    const filtered = await $(second).nextSiblings('#first').get()
    expect(filtered).toBeUndefined()
  })
})
