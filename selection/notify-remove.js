define(
  [ 'd3' ]
, function(d3) {
    return function() {
      var dispatch = d3.dispatch('node-removed')
        , checkIntervalDelay = 1500
        , elements = []
        , checkIntervalId

      function notifyRemove(s) {
        s.each(notifyRemoveEach)
      }

      notifyRemove.checkIntervalDelay = function(value) {
        if (!arguments.length) return checkIntervalDelay
        checkIntervalDelay = value
        return notifyRemove
      }

      return d3.rebind(notifyRemove, dispatch, 'on')

      function notifyRemoveEach(d, i) {
        if (!!~elements.indexOf(this)) return
        elements.push(this)
        if (!checkIntervalId) {
          checkIntervalId = setInterval(checkPresences, checkIntervalDelay) 
        }
      }

      function checkPresences() {

        elements = elements.filter(checkPresence)
        if (!elements.length) clearInterval(checkIntervalId)

        function checkPresence(element) {
          if (document.documentElement.contains(element)) return true
          d3.select(element).each(dispatch['node-removed'])
          return false
        }
      }
    }
  }
)
