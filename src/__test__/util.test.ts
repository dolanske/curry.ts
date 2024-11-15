/**
 * @vitest-environment jsdom
 */

import { describe, expect, it } from 'vitest'
import { getSiblingIndex, isArray, isFunction, isNil, isObject } from '../curry/util'

describe('testing utility functions', () => {
  it('[fn] isArray', () => {
    expect(isArray([])).toBeTruthy()
    expect(Array.from({ length: 10 })).toBeTruthy()

    // @ts-expect-error No param check
    expect(isArray()).toBeFalsy()
    expect(isArray('Hello World')).toBeFalsy()
  })

  it('[fn] isObject', () => {
    expect(isObject({})).toBeTruthy()
    expect(new Map()).toBeTruthy()
    expect(new Set()).toBeTruthy()

    // @ts-expect-error No param check
    expect(isObject()).toBeFalsy()
    expect(isObject('')).toBeFalsy()
  })

  it('[fn] isFunction', () => {
    expect(isFunction(() => {})).toBeTruthy()

    // @ts-expect-error No param check
    expect(isFunction()).toBeFalsy()
    expect(isFunction({})).toBeFalsy()
  })

  it('[fn] isNil', () => {
    expect(isNil(null)).toBeTruthy()
    expect(isNil(undefined)).toBeTruthy()
    expect(isNil()).toBeTruthy()

    expect(isNil('')).toBeFalsy()
    expect(isNil([])).toBeFalsy()
    expect(isNil({})).toBeFalsy()
  })

  it('[fn] getSiblingIndex()', () => {
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
