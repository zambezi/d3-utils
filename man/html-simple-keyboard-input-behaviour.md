## simple-keyboard-input-behaviour `d3-utils/html/simple-keyboard-input-behaviour`

Generate simple gestures (enter, esc) from an `<input>` element.

```javascript
    panel.select('.username')
        .call(
          createSimpleInputBehaviour()
              .on('enter', onSubmitUsername)
              .on('esc.update', onInput)
              .on('esc.redraw', draw)
        )
        .on('input.update', onInput)
        .on('input.redraw', draw)
```

The component will clear the `<input>` element on escape.
This behaviour can be turned off using the `clearOnEsc` getter/setter.

```javascript
    panel.select('.username')
        .call(
          createSimpleInputBehaviour()
              .clearOnEsc(false)
              .on('enter', onSubmitUsername)
        )
```
