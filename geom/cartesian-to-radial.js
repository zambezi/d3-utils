define(
  [ 
    'd3'
  , 'lodash' 
  ]
, function(d3, _) {
    return function() {
      var center = { x: 0, y: 0 }
        , x = _.property('x')
        , y = _.property('y')

      function cartesianToRadial(d) {
        var px = x(d)
          , py = y(d)
          , diff = { x: px - center.x, y: py - center.y }
          , angle = Math.atan2(diff.y, diff.x)
          , radius = Math.sqrt(diff.x * diff.x + diff.y * diff.y)

        return { a: angle, r: radius }
      }

      cartesianToRadial.center = function(value) {
        if (!arguments.length) return center
        center = value
        return cartesianToRadial
      }

      cartesianToRadial.x = function(value) {
        if (!arguments.length) return x
        x = value
        return cartesianToRadial
      }

      cartesianToRadial.y = function(value) {
        if (!arguments.length) return y
        y = value
        return cartesianToRadial
      }

      return cartesianToRadial

    }
  }
)
