# J C U R R Y (curry.ts)

The successor to the most known word in the javascript universe. Every person who came within 5km radius of an IDE has heard of that word. Some shiver, some get excited, some faint when they hear it. What if I told you that you don't need a 40k behemoth of a javascript object? That you actually just need a little curry in your life instead?

## Installation

Because I have literally 0.1 braincells, idk how to set up npm. You directly install this repo and it will clone the `/dist` folder into your node_module.

 `npm install github:dolanske/v-valid`

Or you can just copy and paste the `curry.mjs` file wherever in your project and simply import the `import { $ } from "curry"` instead.

## Feedback / Ideas

Any feedback, issues, ideas, PRs or feature requests are utmost welcome. I am absolutely open to any form of collaboration. Always looking to learn from others!

## TODO

- [] documentation
- [] explore event binding such as $('.btn').click().methodToExecuteOnClick()

## API

I think most developers are familiar with the jQuery syntax. This library heavily borrows the main concepts but builds upon it.

```ts
// Select a dom node using the `$()` function
// Now you can build a chain of methods as long as you wish
$('.dropdown-button').next().slideToggle(300)
```

Curry builds on top of this concept by making the chain async. Next link is not executed until the previous one is resolved.
This is a big advantage when you want your target to have multiple states with an async action inbetween

```ts
$('.fetch').click().text('Hello')
```

.. here ..

### Selectors

### Events

### Styles

### Animations

### Iterators

### Manipulators

### Meta

- wait
- run
- $

### Static API