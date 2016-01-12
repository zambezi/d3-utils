## safe-update-input-value `d3-utils/html/safe-update-input-value`

Updates the value property of a type-in `<input>` element, preserving the cursor position and selection.

```javascript

    var updateInput = require('d3-utils/html/safe-update-input-value')()

    d3.select('.some-input')
        .datum('New Value')
        .call(updateInput)
```

Optionally, a `format` function can be specified.

```javascript

    var updateInput = require('d3-utils/html/safe-update-input-value')()
            .format(formatterFunc)
```
