## forward

Allows dispatching events from a D3 dispatcher in the context of each DOM nodes in a selection.

```javascript

const dispatcher = d3.dispatch('a', 'b', 'etc')
          .on('a', onA)

d3.selectAll('li').each(forward(dispatcher, 'a'))

function onA(d, i) {
  // this ⇒  the <li>
  // d ⇒ the datum bound to the <li>
  // i ⇒ the index of <li> in the selection
}
```
