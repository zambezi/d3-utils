define(
  [ 
    'd3' 
  , '@zambezi/fun/multiply'
  ]
, function(d3, mult) {

    var line = d3.svg.line()

    return function() {
      var type = d3.functor('right-arrow')
        , map = d3.map(
            {
              'right-arrow': rightArrow
            , 'left-arrow': _.compose(rightArrow, _.partial(mult, -1))
            }
          )
        , size = d3.functor(64)

      function symbol(d) {
        return map.get(type(d) || rightArrow)(size(d))
      }

      symbol.type = function(value) {
        if (!arguments.length) return type
        type = d3.functor(value)
        return symbol
      }

      symbol.size = function(value) {
        if (!arguments.length) return size
        size = d3.functor(value)
        return symbol
      }

      symbol.symbolTypes = map.keys()

      return symbol
    }

    function rightArrow(size) {
      var halfSize = size / 2
        , quarterSize = size / 4

      return line(
        [
          [ -quarterSize, -halfSize ]
        , [ quarterSize, 0 ]
        , [ -quarterSize, halfSize ]
        ]
      )
    }
  }
)
