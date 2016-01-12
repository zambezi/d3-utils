define(
  [ 
    'underscore' 
  , './nice'
  , './scale'
  ]
, function(_, nice, scale) {
    return _.compose(nice, scale)
  }
)
