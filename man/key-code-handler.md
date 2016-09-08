## key code handler

An event handler callback wrapper that will automatically check against D3's `event.keyCode` and will only run the provided function if it matches the configured one.

```javascript
d3.select('input')
    .on('keydown', keyCodeHandler(onCommit, 13))
```

It will return `undefined` if the key code doesn't match, so it can be chained using something like Zambezi _Fun!_'s [some result]()

```javascript
d3.select('input')
  .on(
    'keydown.process'
  , some( 
      keyCodeHandler(onCommit, 13)
    , keyCodeHandler(dispatch.cancel, 27)
    // ,  etc.
    )
  )
```
