## resize

A simple component that will dispatch through the DOM the `size-dirty` and `redraw` event whenever the window size changes.
This is to be used for creating complex components where DOM geometry caches need to be expired on resize.

The component works by attaching a `resize` event on `document.window`.
If a `destroy` event is dispatched on the selection this component is called on, the component will deactivate by unsubscribing from the `resize` event.

This can be used in conjunction with [redraw](./redraw.md)

```javascript

function createLargeComponent() {
  function largeComponent(s) {
    s.call(a)
      .call(b)
      .call(d)
      .call(createResize())
      .call(etc)
  }

  return redraw(largeComponent)

}

// and perhaps

function b(s) {
  s.on('size-dirty', () => bounds = null)
}

// etc.
```

The client only needs to,

```javascript
const largeComponent = createLargeComponent()

d3.select('.something').datum([1, 2, 3]).call(largeComponent)
```

... to get a self-refreshing and measuring component.
