## set content if empty

Creates a function that when passed to d3's `selection.select` operator will conditionally set the HTML content of a node (only if it is empty) and select the first child DOM element it finds.

Using `setContentIfEmpty` you can do:

```javascript
const template = '<header class="headings"><h2 class="greeting">hello</h2></header>'
d3.select('section')
  .select(setContentIfEmpty(template))
    .style('background-color', 'plum')
```

```html
<section>
  <header class="headings" style="background-color: plum;">
    <h2 class="greeting">hello</h2>
  </header>
</section>
```


### Rationale

When a D3 component is rendering, it may need to add child DOM elements (if they do not already exist), before making selections and modifiying the DOM.

The function created by `setContentIfEmpty` is intended to be used at the start of rendering, where it can be assumed that the DOM element supplied is either empty or that it contains DOM elements from a previous render, giving theDOM element the contents of the supplied HTML snippet if the DOM element is empty.
