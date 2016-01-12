define(
  [
    'd3'
  , 'underscore'
  , 'd3-utils/dispatch-custom-event'
  ]
, function(d3, _, dispatch) {
    var dispatchRedraw = dispatch('redraw')
      , dispatchSizeDirty = dispatch('size-dirty')

    return function() {
      var type = _.uniqueId('resize.resize_')
        , w  = d3.select(window)

      return function resize(s) {
        if (!!w.on(type)) return
        w.on(type, _.debounce(onWindowResize, 300))
        function onWindowResize() {
          s.each(dispatchSizeDirty).each(dispatchRedraw)
        }
      }
    }
  }
)
