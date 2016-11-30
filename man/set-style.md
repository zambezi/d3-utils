## SetStyle

Utility to set a CSS rule in the current `Document`. It will set all the rules in a `<style class='zambezi-style'>` element in the `<head>`.
The style element will be created if it doesn't exist, updated if it does. `setStyle` will update new version of rules that are already specified.
Useful when we want to quickly change the style of multiple heterogeneous elements without having to select and change them all.

 ```javascript
 d3Utils.setStyle('.my-fancy-selector', { backgroundColor: 'yellow' })
 // The rule will be rewritten
 d3Utils.setStyle('.my-fancy-selector', { backgroundColor: 'red' })
 ```
