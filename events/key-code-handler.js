define(
  [ 'd3' ]
, function(d3) {
    return function keyCodeHandler(fun, code) {
      return function() {
        var matched = d3.event.keyCode == code
        if (!matched) return undefined
        fun.apply(this, arguments)
        return matched
      }
    }
  }
)
