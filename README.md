# J C U R R Y (curry.ts)

The successor to the most known word in the javascript universe. Every person who came within 5km radius of an IDE has heard of that word. Some shiver, some get excited, some faint when they hear it. What if I told you that you don't need a 40k behemoth of a javascript object? That you actually just need a little curry in your life instead?

## Installation

Because I have literally 0.1 braincells, idk how to set up npm. You directly install this repo and it will clone the `/dist` folder into your node_module.

 `npm install github:dolanske/curry.ts`

Or you can just copy and paste the `curry.mjs` file wherever in your project and simply import the `import { $ } from "curry"` instead.

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

[parent](#$.parent), [children](#$.children), [nth](#$.nth)

Selectors are used to query DOM nodes which can then be manipulated within the selection chain. Each time `$()` is used, it spawns a new, independent selection of DOM nodes.

Other selectors are mainly used to narrow this list down to specific nodes. The third layer to this is providing a specific filter within these methods. Please refer to the type bellow in case it appears in the following methods.

```ts
type NarrowingSelector = string | Node | Node[] | HTMLCollection | Curry
```


### $()

The primary selector which spanws a new chain

- Definition
  ```ts
  // `selector` Queries the relevant dom nodes using document.querySelectorAll()
  // `document` Allows inserting a specific document node 
  $(selector: NarrowingSelector, document?: Document)
  ```
- Usage
  ```ts
  // #1 Selects a button with the id `trigger`
  // #2 Adds an event listener for a mousse click
  // #3 Changes it's text content
  $('#trigger').click().text('I was clicked!')
  ```

### $.parent

Select element's parent node

- Definition
  ```ts
  $.parent(selector?: NarrowingSelector) {}
  ``` 

- Usage
  ```ts
  $('#parent').parent()
  ```
### $.children

Select element's child nodes

- Definition
  ```ts
  $.children(selector?: NarrowingSelector) {}
  ``` 

- Usage
  ```ts
  $('#parent').children('span')
  ```

### $.nth

- $.nth
- $.children
- $.nthChild
- $.siblings
- $.prevSiblings
- $.nextSiblings
- $.first
- $.last
- $.next
- $.prev
- $.even
- $.odd
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