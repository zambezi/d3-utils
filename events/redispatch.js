define(
  [
    'd3'
  , 'underscore'
  ]
, function(d3, _) {
    return function() {
      var dispatchers = []

      function redispatch() {
        var dispatch = d3.dispatch.apply(null, dispatchers.reduce(types, []))
        dispatchers.forEach(proxyEvents)

        return dispatch

        function proxyEvents(d) {
          d.types.forEach(proxyEvent)
          function proxyEvent(type) {
            d.dispatcher.on(type + '.redispatch', dispatch[type])
          }
        }
      }

      redispatch.from = function(dispatcher, eventTypes) {
        dispatchers.push(
          {
            dispatcher: dispatcher
          , types: _.isArray(eventTypes) ? eventTypes : _.rest(arguments)
          }
        )

        return redispatch
      }

      redispatch.eventTypes = function() {
        return dispatchers.reduce(toTypes, [])
      }

      return redispatch

      function types(acc, next) {
        return acc.concat(next.types)
      }

      function toTypes(acc, v, k) {
        return acc.concat(v.types)
      }
    }
  }
)
