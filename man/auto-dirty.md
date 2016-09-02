## auto-dirty

Reconfigurable higher-level component, it receives a D3 component, not a selection, and will return a new component that will dispatch `size-dirty` and `data-dirty` events through the DOM every time it's run, just before running the original, provided component.

This allows any internal subcomponents to drop their geometry and data caches whenever the main component is called "from outside".

```javascript
const component = autodirty(originalComponent)

d3.select('something').datum(rows).call(component)
```
