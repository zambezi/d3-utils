define(
  [ 'd3' ]
, function(d3) {
    var s = d3.scale.linear()
    return function nice(domain) {
      return s.domain(domain).nice().domain()
    }
  }
)
