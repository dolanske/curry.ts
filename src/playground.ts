import { $ } from './curry'

const state = $('#app').state({ count: 0 }, function (data) {
  this.textContent = String(data.count)
})

setTimeout(() => {
  state.count++
}, 500)

setTimeout(() => {
  state.count++
}, 1000)
