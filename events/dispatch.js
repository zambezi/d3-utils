define(
  [ 'd3', 'underscore' ]
  , function(d3, _) {
    function dispatch(/* types */) {
      var dispatcher = d3.dispatch.apply(
            null
          , [ 'firstsubscribed', 'lastunsubscribed' ].concat(_.toArray(arguments))
          )
        , baseOn = dispatcher.on
        , listenersMap = {}

      dispatcher.hasListeners = hasListeners
      dispatcher.on = on

      return dispatcher

      function hasListeners(type) {
        return (type || '').indexOf('.') >= 0
          ? !!listenersMap[type]
          : Object.keys(listenersMap).some(matchesType)

        function matchesType(key) {
          return key == type || (key.indexOf(type + '.') == 0)
        }
      }

      function on(type, listener) {
        var baseType = type.split('.', 1)[0]
          , hadBaseListeners = hasListeners(baseType)

        if (arguments.length > 1) {
          if (_.isNull(listener)) {
            delete listenersMap[type]
            if (hadBaseListeners && !hasListeners(baseType)) {
              dispatcher.lastunsubscribed(baseType)
            }

          } else {
            listenersMap[type] = true
            if (!hadBaseListeners && hasListeners(baseType)) {
              dispatcher.firstsubscribed(baseType)
            }
          }
        }

        return baseOn.apply(dispatcher, arguments)
      }
    }

    return dispatch
  }
)
