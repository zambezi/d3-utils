define(
  [
    'lodash'
  , 'd3'
  , 'd3-utils/geom/cartesian-to-radial'
  ]
, function(_, d3, c2r) {

    var pathElements = /^M([0-9-.]+),([0-9-.]+).*[^0-9.-]([0-9-.]+),([0-9-.]+)$/
      , coordinateElements = _.partialRight(_.pick, 'r', 'a')

    return function() {
      // Extracts the first and last points from a data path and transitions to
      // the path around the center. 
      // It doesn't try to 'figure out' the original line; stop lengths must be
      // taken care of outside.

      var cartesianToRadial = c2r()
        , start = _.property('0')
        , end = _.property('1')
        , line = d3.svg.line()

      function radialLinkTween(d, i) {
        var node = d3.select(this)
          , path = node.attr('d')
          , elements = pathElements.exec(path)
          , current = path ?
              _.zipObject(
                [ 'x1', 'y1', 'x2', 'y2' ]
              , _.rest(elements).map(parseFloat)
              )
              : { x1: 0, y1: 0, x2: 0, y2: 0 }
          , c1 = cartesianToRadial({ x: current.x1, y: current.y1 })
          , c2 = cartesianToRadial({ x: current.x2, y: current.y2 })
          , from = [c1, c2].map(coordinateElements)
          , to = [start(d), end(d)].map(coordinateElements)
          , interpolator = d3.interpolate(from, to)

        return function tick(t) {
          node.attr('d', line(interpolator(t)))
        }
      }

      radialLinkTween.line = function(value) {
        if (!arguments.length) return line
        line = value
        return radialLinkTween
      }

      radialLinkTween.start = function(value) {
        if (!arguments.length) return start
        start = value
        return radialLinkTween
      }

      radialLinkTween.end = function(value) {
        if (!arguments.length) return end
        end = value
        return radialLinkTween
      }

      return d3.rebind(radialLinkTween, cartesianToRadial, 'center')
    }
  }
)
