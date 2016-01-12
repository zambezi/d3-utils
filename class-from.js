define(
  [ 'd3' ]
, function(d3) {
    return function classFrom(classes, cl) {
      var c = d3.functor(cl)

      return function flipClasses(s) {
        s.each(flipClass)

        function flipClass(d, i, j) {
          var target = d3.select(this)
            , result = c.call(this, d, i, j)

          classes.forEach(flip)

          function flip(k) {
            target.classed(k, k === result)
          }
        }
      }
    }
  }
)
