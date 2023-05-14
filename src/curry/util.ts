import type { PrevNextCallback } from './types'
import { CURRY_ATTR_PREFIX } from './config'
import type { Selector } from '.'
import { Curry } from '.'

export function isArray(value: any): value is any[] {
  if (!value)
    return false

  return Array.isArray(value)
}

export function toEl<T = HTMLElement>(node: Node): T {
  return node as T
}

export function isObject(value: any): value is object {
  const type = typeof value
  return value != null && (type === 'object')
}

export function isFunction(value: any): value is Function {
  return value && {}.toString.call(value) === '[object Function]'
}

export function isNil(value?: any) {
  return value === null || value === undefined
}

export function getSiblingIndex(el: Element) {
  if (!el || !el.previousElementSibling)
    return 0

  let i = 0
  let cloned: Element | null = el
  // While it has previous siblings, add +1 to the index
  // eslint-disable-next-line no-cond-assign
  while ((cloned = cloned.previousElementSibling) != null)
    i++

  return i
}

export function selectNTHSibling(
  this: Curry,
  selectType: 'prev' | 'next',
  index?: number | PrevNextCallback,
  callback?: PrevNextCallback,
): Curry {
  this.queue(() => {
    const siblingPlace = selectType === 'next' ? 'nextElementSibling' : 'previousElementSibling'

    // If callback has been provided but index hasn't
    if (typeof index !== 'number') {
      callback = index
      index = undefined
    }

    const matches: Element[] = []

    for (const _node of this.nodes) {
      const node = toEl(_node)
      const sibling = node[siblingPlace]

      // When no index jump is provided
      // Just select the next element
      if (!index || index === 1) {
        if (sibling) {
          matches.push(sibling)

          if (callback) {
            callback.apply(sibling, [{
              self: sibling,
              prev: node,
              index: getSiblingIndex(sibling),
              instance: this,
            }])
          }
        }
      }
      else {
        let el: Element | null = node
        // Loop over next children and find element at index
        for (let i = 0; i < index; i++) {
          if (el)
            el = el[siblingPlace]
        }

        if (el) {
          matches.push(el)

          if (callback) {
            callback.apply(el, [{
              self: el,
              prev: node,
              index: getSiblingIndex(node),
              instance: this,
            }])
          }
        }
      }
    }

    this.nodes = matches
  })

  return this
}

export function createElement(el: string): Element {
  const fragment = document.createElement('div')
  fragment.insertAdjacentHTML('beforeend', el)
  return fragment.children[0]
}

export function delay(ms = 1): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function queryDom(selector: Selector, doc?: Document): Node[] {
  if (typeof selector === 'string') {
    let nodes
    if (doc)
      nodes = doc.querySelectorAll(selector)
    else
      nodes = document.querySelectorAll(selector)

    return Array.from(nodes)
  }

  if (selector instanceof HTMLCollection)
    return Array.from(selector)

  if (selector instanceof Node)
    return [selector]

  if (selector instanceof Curry)
    return selector.nodes

  return selector
}

export const formatPrefixAttr = (str: string) => CURRY_ATTR_PREFIX + str
