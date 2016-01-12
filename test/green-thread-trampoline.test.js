define(
  [
    'd3'
  , 'underscore'
  , 'sinon'
  , 'green-thread-trampoline'
  , 'fun/array/trampoline-filter'
  , 'fun/array/trampoline-merge-sort'
  , 'fun/trampoline'
  ]
, function(d3, _, sinon, greenThread, filter, sort, trampoline) {
    describe(
      'green-thread-trampoline'
    , function() {

        var collection
          , originalCollection
          , largeCollection
          , largeCollectionSize = 10000

        beforeEach(
          function() {
            collection = [ 4,2,0,1,3 ]
            originalCollection = collection.slice()
          }
        )

        it(
          'should match direct application on filter'
        , function(done) {
            greenThread(filter(collection, isEven))
                  .on('result.done', onFilterResults)
                  .start()

            function onFilterResults(r) {
              r.should.not.be.null
              r.should.eql(originalCollection.filter(isEven))
              done()
            }
          }
        )

        it(
          'should match direct application on sort'
        , function(done) {
            greenThread(sort(collection))
                  .on('result.done', onFilterResults)
                  .start()

            function onFilterResults(r) {
              r.should.not.be.null
              r.should.eql(originalCollection.sort())
              done()
            }
          }
        )

        it(
          'should split computations into discrete cycles'
        , function(done) {
            var totalSteps = 0
              , cycles = 0
              , thread = greenThread(yieldAfter(100000, 'ok'))
                    .on('cycle.test', onCycle)
                    .on('result.done', onDone)
                    .share(0.01)

            thread.isRunning().should.be.false
            thread.start()
            thread.isRunning().should.be.true

            function onCycle(id, c, ts) {
              cycles = c
              totalSteps = ts
            }

            function onDone(r) {
              r.should.equal('ok')
              expect(totalSteps).to.be.equal(100001)
              expect(cycles).to.be.above(2)
              done()
            }
          }
        )

        it(
          "shouldn't allow restarting a finshed thread"
        , function(done) {
            var thread = greenThread(sort(collection)).on('result', onResult)
            thread.start()
            function onResult() {
              expect(thread.start).to.throw(Error)
              done()
            }
          }
        )
      }
    )

    function isEven(d) {
      return d % 2 == 0
    }

    function yieldAfter(steps, result) {
      return function step() {
        if (steps-->0) return step
        return result
      }
    }
  }
)
