## selection changed `d3-utils/selection/changed`

This selection component allows you to select elements only for which the data has changed.
This is useful to prevent unnecessary redraws of elements.

To use, create a `changed` function and configure its `key` argument.
The `key` argument is a function that takes the data object and returns a string representation of it.
This key will be stored against the node, so the next time you run the selection on it it will generate a new one and compare it to the stored one---if the key string is the same, the element will be skipped from the selection.

    var elementChanged = changed().key(id)

    d3.select("ul")
        .selectAll("li")
        .select(elementChanged)
        .called(expensiveUpdate)

    function id(d) {
      return d.id
    }

In the previous example, all we care about is the id of the data element.
If id is the same as the last time, don't bother calling `expensiveUpdate` function on it.

Let's say you have a component that edits your object---you can change a `.notes` property on it.
And when you want to refresh your lists to reflect that new property.
You can make a `key` function that will take into account that property so that elements for which the `.notes` field have changed will make it into the new selection:

    var elementChanged = changed().key(idAndNotes)

    d3.select("ul")
        .selectAll("li")
        .select(elementChanged)
        .called(expensiveUpdate)

    function idAndNotes(d) {
      return d.id + ":::" + d.notes
    }

Note that you can apply the 'changed' selection even if no key is defined.
In that case it will not be able to detect when an item has not changed so it will return the full selection every time.
