define(
  [
    'd3'
  , 'underscore'
  ]
, function(d3, _) {

    var cancels = 0

    return function createThread(func) {
      var threadId = _.uniqueId('τ┼')
        , dispatch = d3.dispatch('result', 'cycle', 'cancel')
        , hertz = 60
        , share = 0.3
        , thunk = func
        , isRunning = false
        , isDone = false
        , cycles = 0
        , cycleSteps = 0
        , totalSteps = 0

      function thread() {
        return thread.start()
      }

      thread.hertz = function(value) {
        if (!arguments.length) return hertz
        hertz = value
        return thread
      }

      thread.share = function(value) {
        if (!arguments.length) return share
        share = value
        return thread
      }

      thread.isRunning = function() {
        return isRunning
      }

      thread.isDone = function() {
        return isDone
      }

      thread.start = function() {
        if (isRunning) return
        if (isDone) throw new Error("Can't restart a finished thread")
        isRunning = true
        cycle()
        return thread
      }

      thread.cancel = function() {
        if (!isRunning) return
        dispatch.cancel(threadId, ++cancels)
        isRunning = false
        thunk = null
      }

      thread.toString = function() {
        return (
          'green thread ' 
        + threadId 
        + (isRunning ? '-running-' : '')
        + (isDone ? '-done-' : '')
        )
      }

      return d3.rebind(thread, dispatch, 'on')

      function cycle() {
        var start = Date.now()
          , ms = 1000 / hertz
          , available = ms * share
          , elapsed = 0
          , result

        if (!isRunning) return

        while (elapsed < available) {

          result = thunk()

          totalSteps++

          if (_.isFunction(result)) {
            thunk = result
            elapsed = Date.now() - start
            continue
          }

          isRunning = false
          isDone = true
          thunk = null
          break
        }

        dispatch.cycle(
            threadId
          , ++cycles
          , totalSteps
          , totalSteps - cycleSteps
        )

        cycleSteps = totalSteps

        if (isDone) dispatch.result(result, threadId)
        else setTimeout(cycle, ms - elapsed)
      }
    }
  }
)
