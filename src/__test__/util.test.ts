/**
 * @vitest-environment jsdom
 */

import { describe, expect, test } from 'vitest'
import { getSiblingIndex, isArray, isFunction, isNil, isObject } from '../curry/util'

describe('Testing utility functions', () => {
  test('[fn] isArray', () => {
    expect(isArray([])).toBeTruthy()
    expect(new Array(10)).toBeTruthy()

    // @ts-expect-error No param check
    expect(isArray()).toBeFalsy()
    expect(isArray('Hello World')).toBeFalsy()
  })

  test('[fn] isObject', () => {
    expect(isObject({})).toBeTruthy()
    expect(new Map()).toBeTruthy()
    expect(new Set()).toBeTruthy()

    // @ts-expect-error No param check
    expect(isObject()).toBeFalsy()
    expect(isObject('')).toBeFalsy()
  })

  test('[fn] isFunction', () => {
    expect(isFunction(() => {})).toBeTruthy()

    // @ts-expect-error No param check
    expect(isFunction()).toBeFalsy()
    expect(isFunction({})).toBeFalsy()
  })

  test('[fn] isNil', () => {
    expect(isNil(null)).toBeTruthy()
    expect(isNil(undefined)).toBeTruthy()
    expect(isNil()).toBeTruthy()

    expect(isNil('')).toBeFalsy()
    expect(isNil([])).toBeFalsy()
    expect(isNil({})).toBeFalsy()
  })

  test('[fn] getSiblingIndex()', () => {
    const wrapper = document.createElement('div')
    const childA = document.createElement('p')
    const childB = document.createElement('p')
    const childC = document.createElement('p')
    const childD = document.createElement('p')

    wrapper.appendChild(childA)
    wrapper.appendChild(childB)
    wrapper.appendChild(childC)

    expect(getSiblingIndex(childB)).toEqual(1)
    expect(getSiblingIndex(childC)).toEqual(2)

    // @ts-expect-error No param check
    expect(getSiblingIndex()).toEqual(0)
    expect(getSiblingIndex(childD)).toEqual(0)
  })
})
