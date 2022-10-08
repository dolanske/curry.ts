import type { Curry } from '..'
import { $ } from '..'
import { toEl } from '../util'

export type Visibility = (this: Curry) => Curry

export const _show: Visibility = function () {
  this.queue(() => {
    for (const _node of this.nodes) {
      const node = toEl<HTMLElement>(_node)

      if (node && node.style)
        node.style.removeProperty('display')
    }
  })

  return this
}

export const _hide: Visibility = function () {
  this.queue(() => {
    for (const _node of this.nodes) {
      const node = toEl<HTMLElement>(_node)

      if (node && node.style)
        node.style.display = 'none'
    }
  })

  return this
}

export const _toggle: Visibility = function () {
  this.queue(() => {
    for (const _node of this.nodes) {
      const node = toEl<HTMLElement>(_node)

      if (node.style.display === 'none')
        $(node).show()
      else
        $(node).hide()
    }
  })

  return this
}
