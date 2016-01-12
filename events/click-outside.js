define(
  [ 
    'd3' 
  , 'underscore'
  ]
, function(d3, _) {

    return function createClickOutside() {
      var dispatch = d3.dispatch('clickoutside')
        , uniqueType = _.uniqueId('click.click-outside-')
        , body = d3.select(document.body)

      function clickOutside(s) {
        s.each(clickOutsideEach)
      }

      return d3.rebind(clickOutside, dispatch, 'on')

      function clickOutsideEach(d, i) {
        var targetNode = this
          , target = d3.select(targetNode)

        body.on(uniqueType + '-' + i, onBodyClick)

        function onBodyClick() {
          var eventTarget = d3.event.target
          if (targetNode.contains(eventTarget)) return
          target.each(dispatch.clickoutside)
        }
      }
    }
  }
)
