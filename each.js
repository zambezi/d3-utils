define(
  []
, function() {
    return function each(c) {
      return function each(s) {
        return s.each(then)
        function then(d, i) {
          c.apply(this, arguments)
        }
      }
    }
  }
)
