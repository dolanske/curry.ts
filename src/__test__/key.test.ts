/**
 * @vitest-environment jsdom
 */

import type { KeyboardEventKey } from '../curry/keycodes'
import { describe, expect, it } from 'vitest'
import { $, Curry } from '../curry'
import { handleKeyPress, History, Key } from '../curry/modules/key'
import { delay } from '../curry/util'

const key = new Key($(document))

describe('keyboard events handling', () => {
  it('history utility class', async () => {
    const keys: KeyboardEventKey[] = ['Control', 'c']
    const history = new History(keys.length)

    history.add('Backspace')
    history.add('Control')
    history.add('c')

    expect(history.max).toBe(2)
    expect(history.registry).toStrictEqual(keys)

    const match = history.pressing(keys)
    expect(match).toBeTruthy()

    history.add('Escape')

    const match2 = history.pressing(['Control', 'c'])
    expect(match2).toBeFalsy()
  })

  it('key class', () => {
    expect(key.curryInstance).toBeInstanceOf(Curry)
  })

  it('key press handling', async () => {
    handleKeyPress.call(
      key.curryInstance,
      'keydown',
      'a',
      function (event, instance) {
        expect(this).toBeInstanceOf(Node)
        expect(event.key).toBe('a')
        expect(instance).toBeInstanceOf(Curry)
      },
    )

    handleKeyPress.call(
      key.curryInstance,
      'keypress',
      ['Control', 'a'],
      function (event, instance) {
        expect(this).toBeInstanceOf(Node)
        expect(event.key).toBe('a')
        expect(instance).toBeInstanceOf(Curry)
      },
    )

    await delay(5)

    // Simulate click
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }))
    document.dispatchEvent(new KeyboardEvent('keypress', { key: 'a' }))
  })
})
