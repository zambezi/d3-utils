## node removed `d3-utils/selection/notify-remove`

Simple component that will lazily track the elements in your selection and will notify when they are removed from the document.

It does _not_ use deprecated native DOM notification events, but will instead use an internal timer and will check if `document.contains(yourNode)`.

```
var notify = notifyRemove()
    .on('node-removed', onNodeRemoved)

d3.select(target).call(notify)

function onNodeRemoved(d, i) {
  // d -> data bound to the dom element
  // this -> the dom element itself.
}
```
