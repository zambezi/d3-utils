define(
  [ 'underscore' ]
, function(_) {
    // to be used for wrapping normal formatters:
    //
    //   format = _.wrap(d3.time.format('%x'), _.partial(emptyIf, _.isUndefined))
    //
    // will create a function that returns an empty string if the provided value
    // is undefined. Otherwise it'll try to parse it using the d3 formatter.
    return function emptyIf(predicate, fn, d) {
      if (predicate(d)) return ''
      return fn.apply(this, _.rest(_.rest(arguments)))
    }
  }
)
