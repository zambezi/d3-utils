define(
  [
    'd3'
  , 'underscore'
  , './translate'
  , './from-translate'
  , '../geom/radial-to-cartesian'
  ]
, function(d3, _, translate, fromTranslate, radialToCartesian) {
    return function() {

      var toCartesian = radialToCartesian()
        , x = _.property('x')
        , y = _.property('y')

      function radial(d, i) {
        var element = d3.select(this)
          , currentCoordinates = fromTranslate(element.attr('transform'))
              || toCartesian.center()
          , initialPolar = fromCoordinates(currentCoordinates)
          , interpolator = d3.interpolate(initialPolar, d)

        return function(t) {
          element.attr('transform', fromRadial(interpolator(t)))
        }
      }

      radial.x = function(value) {
        if (!arguments.length) return x
        x = value
        return radial
      }

      radial.y = function(value) {
        if (!arguments.length) return y
        y = value
        return radial
      }

      return d3.rebind(radial, toCartesian, 'angle', 'radius', 'center')

      function fromRadial(d) {
        var point = toCartesian(d)
        return translate(x(point), y(point))
      }

      function fromCoordinates(d) {
        var center = toCartesian.center()
          , diff = { x: x(d) - center.x, y: y(d) - center.y }
          , angle = Math.atan2(diff.y, diff.x)
          , radius = Math.sqrt(diff.x * diff.x + diff.y * diff.y)

        return { a: angle , r: radius }
      }
    }
  }
)
