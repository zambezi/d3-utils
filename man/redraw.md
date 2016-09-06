## redraw

Higher order component that receives a not a selection, but a standard 'original' D3 component and will return a new component that will run the original component and will also re-run it every time the event `redraw` is dispatched through the DOM.

This allows easier component composition.  Whenever any of the composed components needs the composing component to run it needs only to dispatch `redraw` through the DOM.

```javascript
function largeComponent(s) {
  s.call(a)
    .call(b)
    .call(c)
    .call(d)
}

const publicComponent = redraw(largeComponent)

// ... 

funciton a(s) {

  a.each(
    function(d, i) {
      // do something.

      // whenever `largeComponent` must be rerun complete,
      d3.select(this).dispatch('redraw', this, { bubbles: true })
    }
  )
}
```
