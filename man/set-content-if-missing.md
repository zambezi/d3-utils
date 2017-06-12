## set content if missing

Creates a function that when passed to d3's `selection.select` operator will conditionally set the HTML content of a node (only if it doesn't contain something that matches the provided selector) and makes a selection using the selector.

The implication of this is that whatever was in the node before will be replaced with the snippet contents when the selector can't be matched.

Using `setContentIfMissing` you can do:

```javascript
const template = '<header class="headings"><h2 class="greeting">hello</h2></header>'
d3.select('section')
  .select(setContentIfMissing(template, '.headings'))
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

When a D3 component is rendering, it is not always safe to assume that the DOM element supplied for rendering is empty or contains DOM elements from a previous render.
Typically this would involve inspecting the DOM node to see if it was empty or whether it contains expected child elements you need to perform a render.

The function created by `setContentIfMissing` is intended to be used at the start of rendering to check (using the selector) whether the content in the DOM element can be kept, or whether the DOM element needs to be given the contents of the supplied HTML snippet.
