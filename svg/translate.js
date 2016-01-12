define(
  [ 'underscore' ]
, function(_) {
    return function translate(x, y) {
      return (
        'translate(' 
      + (_.isUndefined(y) ? x : x + ',' + y)
      +  ')'
      )
    }
  }
)
