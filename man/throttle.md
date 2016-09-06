## throttle

Reconfigurable higher order component that will take, not a selection, but a standard D3 component and will return a new component that will throttle when it's called to prevent excessive redraws.

Internally this uses [underscore's throttle](http://underscorejs.org/#throttle) function.
An optional second `wait` argument may be passed in.

From the underscore documentation:

> [...] throttle will execute the function as soon as you call it for the first time, and, if you call it again any number of times during the wait period, as soon as that period is over.

```javascript
const throttledComponent = throttle(expensiveComponent)

d3.select('.something').datum(data).call(throttledComponent)
```

Can be used with [rebind](./rebind.md) to preserve the original components API.
