define(
  [
    'd3'
  , 'underscore'
  , 'events/live'
  , 'sinon'
  , 'dispatch-custom-event'
  ]
, function(d3, _, live, sinon, dispatch) {

    describe(
      'dispatch-custom-event'
    , function() {

        var body
          , target
          , clickBubble 
          , clickNoBubble

        beforeEach(
          function() {
            body = d3.select('body')
            target = body.append('div').classed('dispatch-custom-event-target', true)
            clickBubble = dispatch('click', true)
            clickNoBubble = dispatch('click', false)
          }
        )

        afterEach(
          function() {
            target.remove()
          }
        )

        it(
          'should dispatch an event when called on a component'
        , function() {
            var spy = sinon.spy()
            target.on('click', spy)
            target.each(clickBubble)
            spy.called.should.be.true
          }
        )

        it(
          'should dispatch a bubbling event when so configured'
        , function() {
            var spy = sinon.spy()
              , child = target.append('div').append('p').text('A paragraph')

            target.on('click', spy)
            child.each(clickBubble)
            spy.called.should.be.true
          }
        )

        it(
          'should dispatch a non bubbling event when so configured'
        , function() {
            var spy = sinon.spy()
              , child = target.append('div').append('p').text('A paragraph')

            target.on('click', spy)
            child.each(clickNoBubble)
            spy.called.should.be.false
          }
        )
      }
    )
  }
)
