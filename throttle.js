define(
  [ ]
, function() {
    return function(component) {
      var requestDrawId
        , skips = 0
        , needsConsolidation
        , immediate
        , consolidate

      function throttle(s) {

        if (requestDrawId) {
          skips++
          needsConsolidation = true
          return
        }

        requestDrawId = requestAnimationFrame(draw)

        if (immediate) drawComponent()

        function drawComponent() {
          s.call(component)
        }

        function draw() {
          var needsToRedraw = !immediate ||
                  (immediate && needsConsolidation && consolidate)

          needsConsolidation = false
          requestDrawId = 0

          if (needsToRedraw) drawComponent()
        }
      }

      throttle.immediate = function(value) {
        if (!arguments.length) return immediate
        immediate = value
        return throttle
      }

      throttle.consolidate = function(value) {
        if (!arguments.length) return consolidate
        consolidate = value
        return throttle
      }

      throttle.skips = function(value) {
        if (!arguments.length) return skips
        skips = value
        return throttle
      }

      return throttle
    }
  }
)
