import { $ } from './curry'

// Automatically runs a callback fn whenever the object property is changed or deleted
// 1. Create a variable using the bind function
const content = $('#app').bind({ msg: 'Hello' }, function ({ msg }) {
  this.textContent = msg
})

// 2. Change variable anywhere on the code
content.msg = 'It works!!'
