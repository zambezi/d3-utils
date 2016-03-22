define(
  [ 
    'd3' 
  , '../events/key-code-handler'
  , '@zambezi/fun/some-result'
  , '@zambezi/fun/batch'
  ]
, function(d3, keyCodeHandler, some, batch) {
    return function createSimpleKeyboardInputBehaviour() {

      var dispatch = d3.dispatch('enter', 'esc')
        , clearOnEsc = true

      function simpleKeyboardInputBehaviour(s) {
        s.each(simpleKeyboardInputBehaviourEach)
      }

      simpleKeyboardInputBehaviour.clearOnEsc = function(value) {
        if (!arguments.length) return clearOnEsc
        clearOnEsc = value
        return simpleKeyboardInputBehaviour
      }

      return d3.rebind(simpleKeyboardInputBehaviour, dispatch, 'on')

      function simpleKeyboardInputBehaviourEach(d, i) {
        var input = d3.select(this)
              .on(
                'keydown.simple-keyboard-input-redispatch'
              , some(
                  keyCodeHandler(dispatch.enter, 13)
                , keyCodeHandler(batch(clearIfNeeded, dispatch.esc), 27)
                )
              )

        function clearIfNeeded() {
          if (clearOnEsc) input.property('value', '')
        }
      }
    }
  }
)
