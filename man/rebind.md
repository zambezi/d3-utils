## rebind

Allows the consolidation of getter/setter APIs from multiple components for easier component composition.

Given the following component factory,

```javascript
function createComponent() {
  const subcomponentA
      , subcomponentB
      , subcomponentC
      , events = dispatch('done')
      , color = 'red'

  function component() {
    s.call(subcomponentA)
        .call(subcomponentB)
        .call(subcomponentC)
        .style('color', color)

    events.call('done')
  }

  component.color = function(value) {
    if (!arguments.length) return color
    color = value
    return component
  }

  return rebind()
      .from(subcomponentA, 'gsA1', 'gsA2' )
      .from(subcomponentB, 'gsB')
      .from(subcomponentC, 'gsC1', 'gsC2:ownC')  // expose gsC2 as ownC on compnent
      .from(events, 'on')
      (component)
}
```

The client will receive a unified API,

```javascript
const component = createComponent()
      .gsA1(123)
      .gsB(456)
      .ownC('sure')
      .on('done', console.log.bind(console, 'All good'))

d3.select('.target').datum([1, 2, 3]).call(component)
```
