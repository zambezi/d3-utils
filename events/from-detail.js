define(
  [ 'd3' ]
, function(d3) {
    return function fromDetail(fn) {
      return function handler() {
        fn.call(this, d3.event.detail)
      }
    }
  }
)
