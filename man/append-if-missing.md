## append if missing

Creates a function that when passed to d3's `selection.select` operator will append (and select) the provided tag and classes but only if they were missing.
Otherwise, it will select the already existing DOM elements.


In the following example,

```javascript
d3.select('section')
  .select(appendIfMissing('div.one-class.another-class'))
    .text('OK')
```

The end structure will be

```html
<section>
  <div class="one-class another-class">Ok</div>
</section>
```

... even if you run the operation multiple times.


### Rationale

It is often necessary to operate on an element that should might but might not be present.
The "traditional" D3 approach is to create a data join with a single whatever element and append the element on the `.enter()` subselection.
Then you must merge with the original selection to continue the operation.

This can become confusing and hard to read, especially when the provided data for the data join is not relevant for the created element.

