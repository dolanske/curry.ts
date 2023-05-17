// $('button').hover().text('hello')

import { $ } from './curry'

$('ul > li').filter([':nth-child(2)']).text('I am second!')
