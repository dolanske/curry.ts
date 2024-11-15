# JCURRY (curry.ts)

The successor to the most known word in the javascript universe. Every person who came within 5km radius of an IDE has heard of that word. Some shiver, some get excited, some faint when they hear it. What if I told you that you don't need a 40k behemoth of a javascript object? That you actually just need a little curry in your life instead?

## Installation

Because I have literally 0.1 braincells, idk how to set up npm. You directly install this repo and it will clone the `/dist` folder into your node_module.

 ```bash
 npm i @dolanske/curry
 ```

Or you can just copy and paste the `curry.mjs` file wherever in your project and import it

```ts
import { $, Curry } from 'curry'
```

## Feedback / Contributions

Any feedback, issues, ideas, PRs or feature requests are utmost welcome. I am absolutely open to any form of collaboration. Always looking to learn from others!

Currently this is the list of features I am considering

- [ ] Async triggering on key events eg `$.key().(chain to be executed after key event is triggered)`

## Usage

I think most developers are familiar with the jQuery syntax. This library heavily borrows the main concepts but builds upon it.

```ts
// Select a dom node using the `$()` function
// Now you can build a chain of methods as long as you wish
$('.heading').next('p').css('font-size', '12px')
```

Curry builds on top of this concept by making the chain async. Next link is not executed until the previous one is resolved.
This is a big advantage when you want your target to have multiple states with an async action in-between

```ts
$('button').click().text('Hello')
```

---

## Selectors

[parent](#parent) • [children](#children) • [nth](#nth) • [nthChild](#nthChild) • [siblings](#siblings) • [prevSiblings](#prevsiblings) • [nextSiblings](#nextSiblings) • [first](#first) • [last](#last) • [prev](#prev) • [next](#next) • [query](#query)

Selectors are used to query DOM nodes which can then be manipulated within the selection chain. Each time `$()` is used, it spawns a new, independent selection of DOM nodes.

Other selectors are mainly used to narrow this list down to specific nodes. The third layer to this is providing a specific filter within these methods. Please refer to the type bellow in case it appears in the following methods.

```ts
type NarrowSelector = string | Node | Node[] | HTMLCollection | Curry
```

## $()

The primary selector which spawns a new chain

```ts
// `selector` Queries the relevant dom nodes using document.querySelectorAll()
// `document` Allows inserting a specific document node
$(selector: NarrowSelector, document?: Document);
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
$.parent(selector?: NarrowSelector);
```

Usage
```ts
$('#child').parent()
```
## children

Select element's child nodes
```ts
$.children(selector?: NarrowSelector);
```

Usage
```ts
$('#parent').children('span')
```

## nth

Narrow down selected nodes to the provided index(es)
```ts
$.nth(index: number | number[], fn: IteratorCallback);
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
$.siblings(selector?: NarrowSelector);
```
## prevSiblings

Selects all sibling elements rendered *before* the current selector
```ts
$.prevSiblings(selector?: NarrowSelector);
```

## nextSiblings

Selects all sibling elements rendered *after* the current selector
```ts
$.nextSiblings(selector?: NarrowSelector);
```

## first

Filter down selected elements to the first one. Optionally executes the provided callback
```ts
$.first(callback?: GenericCallback);
```

## last

Filter down selected elements to the last one. Optionally executes the provided callback.
```ts
$.last(callback?: GenericCallback);
```

## prev

Selects the previous element sibling, if there is one available.
```ts
// `index` select a previous sibling at specific index (starting from the current selector).
// Providing `0` and `1` will have the same result as using `prev()`
$.prev(index?: number | PrevNextCallback, callback?: PrevNextCallback);
```

Usage
```ts
$('button').click().prev().text('I am the previous element')
```
## next

Selects the next element sibling, if there is one available.
```ts
// `index` select a next sibling at specific index (starting from the current selector).
// Providing `0` and `1` will have the same result as using `prev()`
$.next(index?:number | PrevNextCallback, callback?: PrevNextCallback);
```

Usage
```ts
$('button').click().next().hide()
```

## query

Allows querying new set of DOM nodes during a chain execution instead of having to create new chain. The previously selected nodes can be optionally preserved.

```ts
// `append` if set to `true`, the previously queried elements are preserved
$.query(selector: NarrowSelector, append?: boolean);
```

Usage
```ts
$('.theme-switch').click().query('body').toggleClass('dark-theme')
```

## is

Returns wether the selected elements match the provided condition(s)
```ts
// `applyTo` Decides wether to check if the condition is true for all, some or none of the selected elements
$.is(condition: string | string[], applyTo?: 'some' | 'every' | 'none')
```

Usage
```ts
$('span#id').is(['#id', 'b'], 'every') // false
$('span#id').is('span') // true
```

---

## Events

[on](#on) • [click](#click) • [key](#key) • [hover](#hover) • [trigger](#trigger)

Bind and trigger DOM events. This functionality is similar to how jQuery works, but it's been significantly improved upon.

When using `$.on`, `$.click` (and maybe `$.key` in the future) - all chained methods beyond the definition are executed when the event is fired.

```ts
// jQuery syntax (also supported by this library)
$('button').on('click', function () {
  $(this).text('I was clicked!')
})

// The improved syntax jCurry supports
$('button').on('click').text('I was clicked!')
```

## on

Attach an event to the selected element
```ts
$.on(eventName: string, callback?: EventCallback, options?: EventListenerOptions);
```

Usage
```ts
$('.trigger').on('mouseenter', _, { passive: true }).addClass('active')
$('.trigger').on('mouseleave', function () {
  $(this).delClass('active')
})
```

## click

Shorthand for attaching the click event to selected elements
```ts
$('button').click().text('Clicked!')
// is the same as
$('button').on('click').text('Clicked!')
```

## key

Attach keyboard events to the selected elements. This is not a method but an object and can not have any more links chained to it.
```ts
// `keys`
$.key.down(keys: KeyboardEventKey | KeyboardEventKey[], callback: KeyboardEventCallback);
$.key.up(keys: KeyboardEventKey | KeyboardEventKey[], callback: KeyboardEventCallback);
$.key.press(keys: KeyboardEventKey | KeyboardEventKey[], callback: KeyboardEventCallback);
```
Usage
```ts
$(window).key.down('Escape', () => {})

// Waiting for a specific key sequence (up to 10 keys)
$(window).key.down(['Ctrl', 'C'], () => {})
```

## hover

Shorthand for attaching `mouseenter` and `mouseleave` to selected elements. Supports two different syntaxes.
Note: `hover` does not support trigger chaining. If you wish to trigger chains on hover, use the `$.on('mouseenter').<chain>` syntax
```ts
// Experimental: Attempts to restore element to its pre-hover state. Meaning if
// any styles / classes are removed once the user stops hovering the element
$('div').hover(callback?: EventCallback, options?: EventListenerOptions);

$('div').hover({
  // Triggered when user's mouse enters the element
  enter: EventCallback,
  // Triggered when user's mouse leaves the element
  leave: EventCallback
}, options?: EventListenerOptions );

```

## trigger

Manually create DOM events
```ts
// `payload`: optionally define data to be sent to the listeners
$.trigger(eventName: string, payload?: Record<any, any>)
```

Usage
```ts
$(window).on('resize', function () {
  $(this).trigger('my-custom-resize-event', { width: this.innerWidth })
})
```

---

## Attributes

[classes](#classes) • [hasClass](#hasClass) • [display](#display) • [css](#css) • [setAttr](#setAttr) • [getAttr](#getAttr)

Interaction with DOM element attributes and application of non-animation stylistic changes to elements

## classes

Manipulate selected element's class list
```ts
$.addClass(className: string | string[]);
$.delClass(className: string | string[]);
// Toggles between adding an deleting the provided class names
$.toggleClass(className: string | string[]);
```

## hasClass

Check wether the selected elements have one ore multiple of the provided class names. This link should exclusively be used in conditions therefore it does not allow chaining.
```ts
// Apply to controls the returned result based on which selected elements pass the check
// `some`   at least 1 selected element has the classes
// `every`  every selected element must contain the classes
// `none`   inverse of `every`
$.hasClass(className: string | string[], applyTo?: "some" | 'every' | 'none');
```

## display

Control selected element's visibility by applying `display: none` to them
```ts
$.show()
$.hide()
$.toggle()
```

## css

Apply inline CSS styling to selected elements. If you're using type-script, all the valid style properties are provided in the autocomplete.
```ts
$.css(key: keyof CSSStyle | CSSStyle, value: ValueOf<CSSStyle>);
$.css(styleObject: Record<keyof CSSStyle | CSSStyle, ValueOf<CSSStyle>>);
```

Usage
```ts
$('button').click().next().css({
  fontSize: '20px',
  backgroundColor: 'red'
})
```

## setAttr

Add a specific attribute and its value to the selected elements.
If the attribute value is `null`, it will instead remove the attribute.
```ts
type Attr = Record<string, string | number>;
$.setAttr(key: string | Attr | Attr[], value: any);
```

Usage
```ts
$('div').setAttr('data-title', 'Hello World')
$('div').setAttr({ 'data-title': 'Hello World' })
$('div').setAttr([
  { 'data-title': 'Hello World' },
  { 'data-subtitle': 'Goodbye World' },
])
```

## getAttr

Returns a value or an array of values to the provided attribute key(s)
```ts
$.getAttr(key: string | string[]): string | string[] | null;
```

Usage
```ts
// Return the classList and style attribute content in a union
const attributes = $('div').getAttr(['class', 'style'])
```

---

## Animations

[animate](#animate) • [fading](#fading) • [sliding](#sliding)

## Animate

 Apply animation to DOM elements from the provided key-frames. Using the browser [Animation API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API).
 ```ts

// https://developer.mozilla.org/en-US/docs/Web/API/KeyframeEffect/KeyframeEffect#parameters
interface AnimationOptions extends KeyframeAnimationOptions {
  onStart?: (animation: Animation) => void
  onFinish?: (animation: Animation) => void
  onCancel?: (animation: Animation, err: AnimationPlaybackEvent) => void
  // If true, the last keyframe styles will be applied to the elements `style` attribute
  keepStyle?: boolean
};
type Animator = CSSPropertyKeyValuePair | CSSPropertyKeyValuePair[];

$.animate(animator: Animator, options?: AnimationOptions);
```

Usage
```ts
$('.square').animate([
  { backgroundColor: 'red' },
  { backgroundColor: 'blue' },
  { backgroundColor: 'green' },
], {
  infinite: true,
  easing: 'linear',
  duration: 500
})
```

## Fading

Apply fading in & out animation to the selected elements
```ts
interface FadeOptions {
  duration?: number
  easing: AnimationEasingFunction
  // Opacity amount at the end of the applied animation
  // Allows values between 0 and 1
  to?: number
};

$.fadeIn(options?: FadeOptions);
$.fadeOut(options?: FadeOptions);
```

Toggle between the two states. The function determines it's current toggle state based on the provided options and the elements current opacity value.
- `elOpacity === 0 || elOpacity < options.on` --> `fadeIn`
- `else` --> `fadeOut`

```ts
interface FadeToggleOptions {
  duration?: number
  easing: AnimationEasingFunction
  // Opacity amount when fading IN
  on?: number
  // Opacity amount when fading OUT
  off?: number
};

$.fadeToggle(options?: FadeToggleOptions);
```

## Sliding

Apply hiding and showing elements in a smooth sliding up animation
```ts
$.slideUp(duration?:number, easing?: AnimationEasingFunction);
$.slidedown(duration?:number, easing?: AnimationEasingFunction);
```

Usage
```ts
$('#show').click().next().slideDown(500, 'ease-in-out')
```

Also allows toggling between the two states. If target element has `display: 'none'`, it will trigger `$.slideDown()` and vice versa. This method has two overloads.
```ts
interface SlideToggleOptions {
  easing?: number,
  easing?: AnimationEasingFunction,
  // If multiple nodes are selected to be toggled, `override = true` will pick the
  // state of the first node and apply the same slide to all remaining nodes.
  // Unifying the slide state of all nodes.
  override?:boolean,
};

$.slideToggle(duration?: number, easing?: AnimationEasingFunction);
$.slideToggle(options?: SlideToggleOptions);
```

---

## Iterators

[each](#each) • [asyncEach](#asyncEach) • [odd](#odd) • [even](#even) • [filter](#filter)

These method iterate over the selected elements and execute the provided callback. This callback exposes each of the elements as well as additional properties

## each

Iterates over every selected element.
```ts
$.each(callback: IteratorCallback);
```

Usage
```ts
$('ul > li').each(function ({ index, self, instance }) {
  // this, self:  the current <li> element
  // instance:    the current Curry instance
  $(this).text(index)
})
```

## asyncEach

Iterates over every selected element in an async fashion. The iteration does not continue to the next method until the exposed `next()` function has not been called. The entire function also stops the chain execution until all iterations have resolved
```ts
$.asyncEach(callback)
```

Usage
```ts
$.asyncEach(function (next, { index, self, instance }) {
  // this, self:  the current <li> element
  // instance:    the current Curry instance
  $(this).text(index);
  // Think of it as `continue` except without calling the iteration pauses
  next();
}).
```

## odd

Iterates over each odd selected element and executes a callback.
```ts
$.odd(callback: IteratorCallback);
```

## even

Iterates over each even selected element and executes a callback.
```ts
$.even(callback: IteratorCallback);
```

## filter

Iterate over every selected element and checks wether each element passes the provided condition
```ts
type Condition = NarrowSelector | NarrowSelector[] | IteratorCallback<boolean>;

// ApplyTo is only useful if multiple NarrowSelectors are provided.
// It will check every condition against every element and returns a true/false
// based on the following:
// `some`   at least 1 condition passes
// `every`  every condition must pass
// `none`   no condition must pass
$.filter(condition: Condition, applyTo?: "some" | 'every' | 'none');
```

Usage
```ts
// Using callback function
$('ul > li')
  .filter(({ index }) => {
    return index % 4 === 0
  })
  .text('I am every 5th list item!!')

// Using conditions
$('ul > li')
  .filter([':nth-child(5)', ':visible'], 'every')
  .text('I am every 5th list item!!')
```

## Manipulators

[bind](#bind) • [add](#add) • [prepend](#prepend) • [append](#append) • [addChild](#addChild) • [prependChild](#prependChild) • [appendChild](#appendChild) • [swap](#swap) • [replace](#replace) • [teleport](#teleport) • [fullscreen](#fullscreen) • [text](#text) • [del](#del)

Methods which directly manipulate the DOM. Used for creating, deleting or moving elements around.
Those which create elements accept the same time.
```ts
type NewNode = Element | string | Node | Array<Element | string | Node>
```

## bind

Allows us to bind reactive data to a DOM node. This chain returns an object and
each time its property is updated, it runs the reactive function. Allowing us to
update the DOM based on the data.

```ts
type RawObject = Record<PropertyKey, string | number | boolean | null | undefined>
type BindFn<T> = (this: HTMLElement, obj: T, instance: Curry) => void

$.bind(data: RawObject, fn: BindFn<typeof data>)
```

Usage
```ts
const binding = $('#app').bind({ count: 0 }, function ({ count }) {
  this.textContent = `Count is ${count}`
})
binding.count++
binding.count += 10
// #app.textContent === 'Count is 11'

delete binding.count
// #app.textContent === 'Count is undefined'
```
## add

Create a new HTML Element and insert it before/after the selected element
```ts
$.add(node: NewNode, location?: "prepend" | 'append' /* default: 'append' */)
```

Usage
```ts
$('.link:last-of-type').add('<a href="/"" class="link">New link</a>')
$('div').add(document.createElement('a'), 'prepend')
$('div').add()
```

## prepend

Shorthand for using `$.add(<element>, 'prepend')`
```ts
$.prepend(node: NewNode);
```

## append

Shorthand for using `$.add(<element>, 'append')`
```ts
$.append(node: NewNode);
```

## addChild

Create a new HTML and insert it before/after the selected element's children
```ts
$.addChild(node: NewNode, location?: "prepend" | 'append' /* default: 'append' */);
```

Usage
```ts
$('ul').addChild(document.createElement('li'))
```

## prependChild

Shorthand for using `$.addChild(<element>, 'prepend')`
```ts
$.prependChild(node: NewNode);
```

## appendChild

Shorthand for using `$.addChild(<element>, 'append')`
```ts
$.appendChild(node: NewNode);
```

## swap

Swap the position of two elements. It is recommended to use this method when selecting a single element to avoid problems.
Note: If the chain contains multiple selected elements, it will always pick the first one, as swapping multiple elements is currently not supported.

```ts
// this takes the currently selected element and swaps it with the provided one
$.swap(el)
$.swap(target, el)
```

Usage
```ts
$('#element').swap('#otherelement')
$(document).swap('#element', '#otherelement')
```

## replace

Replace element with the given target. Same as with swap, if multiple nodes are selected, it only takes the first one to be replaced
```ts
// If only target is provided, the `$.nodes[0]` will replace `target`
$.replace(target)
// If target and el are provided, the `target` will replace `el`
$.replace(target, el)
```

Usage
```ts
$('#replacer').replace('#uwu')
// Document does not figure in this what so ever
// both target and el are provided in the method itself
$(document).replace('#replacer', document.createElement('span'))
```

## teleport

Moves the selected elements to the provided destination
```ts
$.teleport(target: Element | Node | string);
```

Usage
```ts
// https://developer.mozilla.org/en-US/docs/Web/API/Element/requestFullscreen#parameters
$('#text-wrapper').teleport('#modal-wrapper')
```

## fullscreen

Takes the first selected element and opens it in fullscreen. This is usually used when we have a wrapper div (with an ID) and want to display it in the fullscreen. Not recommended on a query of elements larger than 1.
```ts
type Options = FullscreenOptions & {
  // this: the fullscreen element
  onOpen?: (this: string | Element | Node) => void
  onError?: (this: string | Element | Node, error: Error) => void
};

$.fullscreen(options?: Options);
$.fullscreen(target: Element | Node | string, options?: Options);
```

Usage
```ts
// Takes #wrapper and opens it in fullscreen
$('#wrapper').fullscreen({
  onOpen: () => console.log('Opened fullscreen!');
});

// You can provide a target in the fullscreen function itself
$('.open-fullscreen').click().fullscreen('#wrapper', {
  onOpen: () => console.log('Opened fullscreen!');
});
```

## text

Change the `textContent` of the selected elements
```ts
// `location` if not undefined, it will add the new text before or after the elements textContent
$.text(text: string, location?: 'prepend' | 'append');
```

Usage
```ts
$('p').text('I am the text now!')
```

## del

Removes the selected elements
```ts
// In case selector is provided, only the elements matching it will be deleted
$.del(selector?: NarrowSelector);
```

Usage
```ts
// Delete all list items except the first one
$('ul').children().del(':not(:first-child)')
```

---

## Meta

[wait](#wait) • [run](#run) • [get](#get)

Set of specific functions which don't interact with the DOM

## wait

Pauses the chain for the specified amount of milliseconds
```ts
// Upon clicking, add a `clicked` class to the button in 0.5 seconds
$('button').click().wait(500).addClass('clicked')
```

## run

Execute a callback function in the chain. Function can return a promise and the chain will pause until the promise is resolved. This can be used to perform async operations and execute chain depending on the result
```ts
// Callback exposes the whole chain instance
$.run(callback: (this: Curry) => void);
$.run(callback: (this: Curry) => Promise<any>);
```

## get

Can be placed at the end of the chain. It does not allow any chaining. If no parameter is provided, it will return the remaining selected elements

You can provide a parameter, which will return the top level property from the DOM object. [Full list on MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element#instance_properties)
```ts
$.get(key?: string);
```

Usage
```ts
// Because chains are async, we have to await them
// because there could be more chained links which take a while to execute.
const listItems = await $('li').get()
const listItemsContents = await $('li').get('textContent')
```
