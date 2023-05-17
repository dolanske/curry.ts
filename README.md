# J C U R R Y (curry.ts)

The successor to the most known word in the javascript universe. Every person who came within 5km radius of an IDE has heard of that word. Some shiver, some get excited, some faint when they hear it. What if I told you that you don't need a 40k behemoth of a javascript object? That you actually just need a little curry in your life instead?

## Installation

Because I have literally 0.1 braincells, idk how to set up npm. You directly install this repo and it will clone the `/dist` folder into your node_module.

 ```bash
 npm install github:dolanske/curry.ts
 ```

Or you can just copy and paste the `curry.mjs` file wherever in your project and import it

```ts
import { $, Curry } from 'curry'
```

## Feedback / Contributions

Any feedback, issues, ideas, PRs or feature requests are utmost welcome. I am absolutely open to any form of collaboration. Always looking to learn from others!

Currently this is the list of features I am considering

- [ ] Async triggering on key events
- [ ] Simple reusable UI component definitions

## Usage

I think most developers are familiar with the jQuery syntax. This library heavily borrows the main concepts but builds upon it.

```ts
// Select a dom node using the `$()` function
// Now you can build a chain of methods as long as you wish
$('button').next().slideToggle(300)
```

Curry builds on top of this concept by making the chain async. Next link is not executed until the previous one is resolved.
This is a big advantage when you want your target to have multiple states with an async action inbetween

```ts
$('button').click().text('Hello')
```

---

## Selectors

[parent](#parent) • [children](#children) • [nth](#nth) • [nthChild](#nthChild) • [siblings](#siblings) • [prevSiblings](#prevsiblings) • [nextSiblings](#nextSiblings)  • [first](#first)  • [last](#last) • [prev](#prev)  • [next](#next)

Selectors are used to query DOM nodes which can then be manipulated within the selection chain. Each time `$()` is used, it spawns a new, independent selection of DOM nodes.

Other selectors are mainly used to narrow this list down to specific nodes. The third layer to this is providing a specific filter within these methods. Please refer to the type bellow in case it appears in the following methods.

```ts
type NarrowingSelector = string | Node | Node[] | HTMLCollection | Curry
```


## $()

The primary selector which spanws a new chain

```ts
// `selector` Queries the relevant dom nodes using document.querySelectorAll()
// `document` Allows inserting a specific document node 
$(selector: NarrowingSelector, document?: Document)
```

Usage
```ts
// #1 Selects a button with the id `trigger`
// #2 Adds an event listener for a mousse click
// #3 Changes it's text content
$('#trigger').click().text('I was clicked!')
```

## parent

Select element's parent node
```ts
$.parent(selector?: NarrowingSelector) {}
``` 

Usage
```ts
$('#parent').parent()
```
## children

Select element's child nodes
```ts
$.children(selector?: NarrowingSelector) {}
``` 

Usage
```ts
$('#parent').children('span')
```

## nth

Narrow down selected nodes to the provided index(es)
```ts
$.nth(index: number | number[], fn: IteratorCallback) {}
```

Usage
```ts
$('li').nth([2, 3]).text('I am third and fourth list item')
```
## nthChild

Narrow down selected element's children to the provided index(es)

Usage
```ts
$('ul').nthChild([3, 4])
// Is the equivalent to this
$('ul').children().nth([3, 4])
```

## siblings

Select all element's siblings. Siblings are DOM nodes in the same nesting layer as the selected element
```ts
$.siblings(selector?: NarrowSelector)
```
## prevSiblings

Selects all sibling elements rendered *before* the current selector
```ts
$.prevSiblings(selector?: NarrowSelector)
```

## nextSiblings

Selects all sibling elements rendered *after* the current selector
```ts
$.nextSiblings(selector?: NarrowSelector)
```
  
## first

Filter down selected elements to the first one. Optionally executes the provided callback
```ts
$.first(callback?: GenericCallback)
```

## last

Filter down selected elements to the last one. Optionally executes the provided callback.
```ts
$.last(callback?: GenericCallback)
```

## prev

Selects the previous element sibling, if there is one available.
```ts
// `index` select a previous sibling at specific index (starting from the current selector). Providing `0` and `1` will have the same result as using `prev()`
$.prev(index?: number | PrevNextCallback, callback?: PrevNextCallback)
```

Usage
```ts
$('button').click().prev().text('I am the previous element')
```
## next

Selects the next element sibling, if there is one available.
```ts
// `index` select a next sibling at specific index (starting from the current selector). Providing `0` and `1` will have the same result as using `prev()`
$.next(index?:number | PrevNextCallback, callback?: PrevNextCallback)
```

Usage
```ts
$('button').click().next().hide()
```





- $.next
- $.prev
- $.odd
- $.even

- $.is
- $.query
- $.filter

### Events

- $.on
- $.hover
- $.click
- $.trigger
- $.key

### Styling

- $.toggleClass
- $.addClass
- $.delClass
- $.css
- $.show
- $.hide
- $.toggle
### Attributes
- $.hasClass
- $.attr
- $.setAttr
- $.getAttr


### Animations

- $.aniamate
- $.fadeToggle
- $.fadeIn
- $.fadeOut
- $.slideToggle
- $.slideDown
- $.slideUp



### Iterators

- $.each
- $.asyncEach
### Manipulators

- $.add
- $.del
- $.replace
- $.addChild
- $.fullscreen
- $.prependChild
- $.teleport
- $.prepend
- $.append
- $.swap
- $.text

### Meta

- $.wait
- $.run
- $.get

### Static API

- Curry.fullscreen
- Curry.replace
- Curry.swap
- Curry.text
- Curry.$fn

---

## Type Definitions

```ts
export type GenericCallback = (
  this: Element,
  options: {
    self: Element
    instance: Curry
    index?: number
  }
) => void

interface CustomEventProperty extends Event {
  detail?: any
}

export type EventCallback = (
  this: Element,
  event: CustomEventProperty,
  instance: Curry
) => void

export type KeyboardEventCallback = (
  this: Element,
  event: KeyboardEvent,
  instance: Curry
) => void

export type IteratorCallback<T = void> = (
  this: Element,
  options: {
    self: Element
    instance: Curry
    index: number
  }
) => T

export type PrevNextCallback = (
  this: Element,
  options: {
    self?: Element | null
    prev?: Element | null
    instance: Curry
    index?: number
  }
) => void
```