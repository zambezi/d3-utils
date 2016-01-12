define(
  [ 
    'd3' 
  , 'underscore'
  ]
, function(d3, _) {
    return function() {
      var center = { x: 0, y: 0 }
        , angle = _.property('a')
        , radius = _.property('r')

      function radialToCartesian(d) {
        var a = angle(d)
          , r = radius(d)

        return { 
          x: center.x + Math.cos(a) * r
        , y: center.y + Math.sin(a) * r 
        }
      }

      radialToCartesian.angle = function(value) {
        if (!arguments.length) return angle
        angle = value
        return radialToCartesian
      }

      radialToCartesian.radius = function(value) {
        if (!arguments.length) return radius
        radius = value
        return radialToCartesian
      }

      radialToCartesian.center = function(value) {
        if (!arguments.length) return center
        center = value
        return radialToCartesian
      }

      return radialToCartesian
    }
  }
)
