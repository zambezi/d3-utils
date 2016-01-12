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
      'events.live'
    , function() {

        var body
          , target
          , click = dispatch('click', true)

        beforeEach(
          function() {
            body = d3.select('body')
            target = body.append('div').classed('live-test-target', true)
          }
        )

        afterEach(
          function() {
            target.remove()
          }
        )

        it(
          'should catch events from targets which match a selector.'
        , function() {
            var childSpy = sinon.spy()
              , child 

            target.call(
              live('click', 'mouseover')
                  .selector('p.magic')
                  .on('click', childSpy)
            )

            child = target
                .append('div')
                .append('p')
                  .classed('magic', true)
                  .text('Magic')
                  .datum('ABCD')
                  .each(click)

            childSpy.called.should.be.true
            childSpy.calledOn(child.node()).should.be.true
            childSpy.calledWith('ABCD').should.be.true
          }
        )

        it(
          'should catch events from nested targets which match a selector.'
        , function() {
            var childSpy = sinon.spy()
              , child 

            target.call(
              live('click', 'mouseover')
                  .selector('p.magic')
                  .on('click', childSpy)
            )

            child = target
                .append('div')
                .append('p')
                  .classed('magic', true)
                  .text('Magic')
                  .datum('ABCD')

            child.append('i').text('ICON').each(click)

            childSpy.called.should.be.true
            childSpy.calledOn(child.node()).should.be.true
            childSpy.calledWith('ABCD').should.be.true
          }
        )
      }
    )
  }
)
