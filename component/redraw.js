define(
  [ 
    'd3' 
  , 'underscore'
  ]
, function(d3, _) {

    return function redraw(component) {
      var args = _.rest(arguments)
        , s = this

      s.on('redraw.component-redraw', draw)
      draw()

      function draw() {
        component.apply(s, args)
      }
    }
  }
)
