/**
 * @vitest-environment jsdom
 */

import { expect, it } from 'vitest'
import { $, Curry } from '../curry/index'
import { delay } from '../curry/util'

it('click event listener with callback', async () => {
  const btn = document.createElement('button')
  document.body.appendChild(btn)

  $(btn).click(function (event, instance) {
    expect(this).toStrictEqual(btn)
    expect(event).instanceOf(Event)
    expect(instance).instanceOf(Curry)
  })

  await delay(5)
  btn.click()
})

it('chain click events', async () => {
  const btn = document.createElement('button')
  document.body.appendChild(btn)

  $(btn).click().text('Hello')
  await delay(5)

  btn.click()
  await delay(5)

  expect(btn.textContent).toBe('Hello')
})
