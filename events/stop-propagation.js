define(
  ['d3']
, function(d3) {
    return function stopPropagation() {
      d3.event.stopPropagation()
    }
  }
)
