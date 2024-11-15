/**
 * @vitest-environment jsdom
 */

import { describe, expect, it } from 'vitest'
import { $ } from '../curry/index'
import { delay } from '../curry/util'

it('adding a class with $.addClass()', async () => {
  const div = document.createElement('div')

  $(div).addClass('test1')
  await delay(10)

  expect(Array.from(div.classList)).toStrictEqual(['test1'])

  $(div).addClass(['test2', 'test3'])
  await delay(10)

  expect(Array.from(div.classList)).toStrictEqual(['test1', 'test2', 'test3'])
})

it('removing a class with $.delClass()', async () => {
  const div = document.createElement('div')
  div.classList.add('test1', 'test2', 'test3')

  $(div).delClass('test1')
  await delay(10)

  expect(Array.from(div.classList)).toStrictEqual(['test2', 'test3'])

  $(div).delClass(['test2', 'test3'])
  await delay(10)

  expect(Array.from(div.classList)).toStrictEqual([])
})

it('toggle class with $.toggleClass()', async () => {
  const div = document.createElement('div')

  $(div).toggleClass('test1')
  await delay(10)

  expect(Array.from(div.classList)).toStrictEqual(['test1'])

  $(div).toggleClass(['test1', 'test2'])
  await delay(10)

  expect(Array.from(div.classList)).toStrictEqual(['test2'])
})

describe('hasClass', async () => {
  const div1 = document.createElement('span')
  div1.classList.add('test1')
  const div2 = document.createElement('span')
  div2.classList.add('test1', 'test2')
  const parent = document.createElement('div')
  parent.appendChild(div1)
  parent.appendChild(div2)

  it('checking if every selected element contains classes', async () => {
    const result = $(parent).children().hasClass(['test1', 'test2'])
    expect(result).toBe(false)
  })

  it('checking if element has some of these classes', async () => {
    const result = $(parent.children).hasClass('test2', 'some')
    expect(result).toBe(true)
  })

  it('checking if element has none of the classes', async () => {
    const result = $(parent).children().hasClass('test3', 'none')
    await delay()
    expect(result).toBe(true)
  })
})
