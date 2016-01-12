define(
  []
, function() {
    return function scaleRange(factor, range) {
      var min = range[0]
        , max = range[1]
        , span = max - min
        , halfNewSpan = span * factor / 2
        , center = min + span / 2

      return [ center - halfNewSpan, center + halfNewSpan ]
    }
  }
)
