## throttle to animation frame

Configurable higher order component that will take, not a selection, but a standard D3 component and will return a new component that, when called, will run the original component once on the next "animation frame", as provided by `requestAnimationFrame`

This allows the component to be "liberally" called by the client, but will still draw only once, when needed.

```javascript
const throttledComponent = throttleToAnimationFrame(expensiveComponent)
d3.select('.something').datum(data).call(throttledComponent)
```

NOTE: the original component will *not*, then, run synchronously -- don't expect the component to have run the line after you call the component.
