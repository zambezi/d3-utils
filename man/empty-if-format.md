## empty-if-format

To be used for wrapping normal formatters.
It will return an empty string if the provided predicated is true.

```javascript
const format = _.wrap(d3.timeFormat('%x'), _.partial(emptyIf, _.isUndefined))
```

... will create a function that returns an empty string if the provided value is undefined. 
Otherwise it'll try to parse it using the d3 formatter.
