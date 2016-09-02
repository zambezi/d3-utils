## event `fromTarget`

Allows attaching a D3 event handler on an container but still have a handler that expects the dispatcher to be the nested element from which the event was originally dispatched.

Given the following structure,

```html
<div class=".target">
  <section>
    <button></button>
  </section>
</div>
```

... if you a handler is configured like this,

```javascript
d3.select('.target').on('click', fromTarget(onClick))
```

... if the button is clicked, the context of the handler will be

```javascript
function onClick(d) {
  // this => the <button> DOM element
  // d    ⇒> the datum bound on <button>
}
```

## event `fromDetail`

Allows native DOM event handlers attached on selections to receive the native event's `detail` object as its argument.
This relieves the client from having to to dig it out through the global `d3.event` reference.

Example component provider,

```javascript
function component(s) {
  s.dispatch('something', this, { bubbles: true, detail: { a: 'A', b: 'B' } })
}
```

... then, the context of the follwing handler will be,

```javascript
d3.select('.target')
    .on('something', fromDetail(onSomething))
    .call(component)

function onSomething(d) {
  // d ⇒> { a: 'A', b: 'B'}
}
```
