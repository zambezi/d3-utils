define(
  [ 
    'd3'
  , './dispatch'
  , 'underscore'
  , '../matches-selector'
  ]
, function(d3, dispatch, _, matches) {

    return function dispatcher(/* types */) {
      var dispatcher = d3.dispatch.apply(null, arguments)
        , selector
        , handlerByType = {}

      function live(s) {

        s.each(liveEach) 

        function liveEach(d, i) {
          var target = d3.select(this)

          Object.keys(handlerByType).forEach(setupHandler)

          function setupHandler(type) {
            var handler = handlerByType[type]
            target.on(type, conditionalProxy(handler))
            if (_.isNull(handler)) delete handlerByType[type]
          }

          function conditionalProxy(handler) {
            if (!handler) return null

            return function handle(d, i) {
              var targetNode = target.node()
                , eventTarget = d3.event.target
                , candidate = eventTarget
              while (targetNode.contains(candidate)) {
                if (matches(candidate, selector))  {
                  d3.select(candidate).each(handler)
                  return 
                }
                candidate = candidate.parentNode
              }
            }
          }
        }
      }

      live.selector = function(value) {
        if (!arguments.length) return selector
        selector = value
        return live
      }

      live.on = function(type, callback) {
        handlerByType[type] = callback
        return live
      }

      return live
    }
  }
)
