define(
  [ 'd3', 'underscore', 'events/dispatch', 'sinon' ]
, function(d3, _, dispatch, sinon) {
    describe(
      'Event dispatch'

      
    , function() {

        var d

        beforeEach(
          function() {
            d = dispatch('data', 'error')
          }
        )

        afterEach(
          function() {
            d = null
          }
        )

        it(
          'should have normal D3 dispatcher style methods.'
        , function() {

            expect(d.data).to.be.a('function')
            expect(d.error).to.be.a('function')
            expect(d.on).to.be.a('function')
          }
        )

        it(
          'should provide basic D3 dispatcher functionality.'
        , function() {
            var dataA = sinon.spy()
              , dataB = sinon.spy()
              , errorA = sinon.spy()
              , errorB = sinon.spy()
              , errorC = sinon.spy()


            d.on('data', dataA)
              .on('data', dataB)
              .on('error.1', errorA)
              .on('error.2', errorB)
              .on('error.2', errorC)


            d.data(42)

            dataA.called.should.be.false
            dataB.called.should.be.true

            d.error(66)

            errorA.called.should.be.true
            errorB.called.should.be.false
            errorC.called.should.be.true
            errorC.calledWith(66).should.be.true

            d.on('data', null)

            d.data(555)

            dataB.callCount.should.equal(1)


          }
        )

        it(
          'should expose a .hasListeners method'
        , function() {
            expect(d.hasListeners).to.be.a('function')
          }
        )

        it(
          'should report if it has listeners for a specific type'
        , function() {
            d.on('data', function() {})
              .on('data.something', function() {})

            d.hasListeners('data').should.be.true
            d.hasListeners('data.something').should.be.true
            d.hasListeners('error').should.be.false
          }
        )

        it(
          'should report if it has listeners for a type, even if namespaced'
        , function() {
            d.on('data.something', function() {})
            d.hasListeners('data').should.be.true
            d.hasListeners('data.something-else').should.be.false

            d.on('data.something', null)
            d.hasListeners('data').should.be.false
          }
        )
      }
    )
  }
)
