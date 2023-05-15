/**
 * @vitest-environment jsdom
 */

import { beforeEach, describe, expect, test } from 'vitest'
import { $ } from '../curry'
import { delay } from '../curry/util'

const DELAY = 100

describe('$.slide() methods', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  test('slideUp & slideDown', async () => {
    const el = document.createElement('div')
    document.body.appendChild(el)
    const start = performance.now()

    $(document.body.children[0]).slideUp(DELAY)

    await delay(DELAY)

    // Even if this is 0, its ok because it exists and that is the point
    expect(el.attributes.getNamedItem('data-curry-original-height')?.value).toBe('0')

    expect(performance.now() - start).toBeGreaterThanOrEqual(DELAY)
    expect((document.body.children[0] as HTMLDivElement).style.getPropertyValue('display')).toBe('none')
    expect((document.body.children[0] as HTMLDivElement).style.getPropertyValue('overflow')).toBe('hidden')

    $((document.body.children[0] as HTMLDivElement)).slideDown(DELAY)

    await delay(DELAY)

    expect((document.body.children[0] as HTMLDivElement).style.getPropertyValue('display')).toBe('')
    expect((document.body.children[0] as HTMLDivElement).style.getPropertyValue('overflow')).toBe('')
  })

  // Literally just a copy but methods are exchanged for the toggle version
  test('slideToggle', async () => {
    const el = document.createElement('div')
    document.body.appendChild(el)
    const start = performance.now()

    $((document.body.children[0] as HTMLDivElement)).slideToggle(DELAY)

    await delay(DELAY)

    expect(performance.now() - start).toBeGreaterThanOrEqual(DELAY)
    expect((document.body.children[0] as HTMLDivElement).style.getPropertyValue('display')).toBe('none')
    expect((document.body.children[0] as HTMLDivElement).style.getPropertyValue('overflow')).toBe('hidden')

    $((document.body.children[0] as HTMLDivElement)).slideToggle(DELAY)

    await delay(DELAY)
    // On slide down the properties are removed
    expect((document.body.children[0] as HTMLDivElement).style.getPropertyValue('display')).toBe('')
    expect((document.body.children[0] as HTMLDivElement).style.getPropertyValue('overflow')).toBe('')
  })

  test('slideToggle multiple nodes with the override option', async () => {
    const el1 = document.createElement('div')
    const el2 = document.createElement('span')

    const wrapper = document.createElement('div')

    wrapper.appendChild(el1)
    wrapper.appendChild(el2)

    $(wrapper).children().last().slideUp(5)

    await delay(25)

    $(wrapper).children().slideToggle({
      duration: 5,
      override: true,
    })

    await delay(100)

    // Now both children should be invisible
    expect(el1.style.display).toBe('none')
    expect(el2.style.display).toBe('none')
  })
})
