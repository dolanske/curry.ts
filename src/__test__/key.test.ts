/**
 * @vitest-environment jsdom
 */

import { describe, expect, test } from 'vitest'
import { $, Curry } from '../curry'
import { History, Key, handleKeyPress } from '../curry/modules/key'
import type { KeyboardEventKey } from '../curry/keycodes'
import { delay } from '../curry/util'

const key = new Key($(document))

describe('Keyboard events handling', () => {
  test('History utility class', async () => {
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

  test('Key class', () => {
    expect(key.curryInstance).toBeInstanceOf(Curry)
  })

  test('Key press handling', async () => {
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
