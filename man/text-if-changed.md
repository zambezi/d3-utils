## update text only if changed `d3-utils/text-if-changed`

Changing the text of a node, as most DOM operations, is expensive---even if the text being set is the same as the text that was already there.
The `text-if-changed` component is a simple component that will change the text of the selection only if the new text is different than the old one.

Let's say you have the following setup:

    var format = d3.format("+.3f")
    selection.text(format)

You can update it with the `text-if-changed` component to prevent re-setting the text on nodes for which the result text wouldn't change:

    var format = d3.format("+.3f")
      , changeText = textIfChanged(format)

    selection.call(changeText)

As with the stock `selection.text` operator, the `text-if-changed` supports literal strings or functions that will return strings in the normal D3 style (receiving `d`, and `i`, with the context `this` set to the DOM node).
