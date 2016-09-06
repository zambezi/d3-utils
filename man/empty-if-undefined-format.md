## empty if undefined

Function that can wrap a formatter function so that if the provided datum is undefined it will return an empty string instead of passing it the formatter.

```javascript
const empty = require("d3-utils/formatters/empty-if-undefined")
    , numberFormatter = d3.format(".3f")
    , formatter = _.wrap(numberFormatter, empty)

» ;[2343.234, 2343.2, undefined, 234.223, 23.111].map(numberFormatter)
  ["2343.234", "2343.200", "NaN", "234.223", "23.111"]
» ;[2343.234, 2343.2, undefined, 234.223, 23.111].map(formatter)
  ["2343.234", "2343.200", "", "234.223", "23.111"]
```
