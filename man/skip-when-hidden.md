## Skip when hidden

Higher order component that receives a not a selection, but a standard 'original' D3 component and will return a new component that will run the original component only if it can determine that the nodes on which they would run are attached.

The check is done quickly and cheaply by checking the presence of `offsetParent` on the node,

> `offsetParent` returns null when the element has style.display set to "none"
> --- https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetParent
