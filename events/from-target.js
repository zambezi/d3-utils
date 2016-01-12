define(
  [ 'd3' ]
, function(d3) {
    return function fromTarget(fn) {
      return function handler() {
        d3.select(d3.event.target).each(fn)
      }
    }
  }
)
