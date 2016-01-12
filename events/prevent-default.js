define(
  ['d3']
, function(d3) {
    return function preventDefault() {
      d3.event.preventDefault()
    }
  }
)
