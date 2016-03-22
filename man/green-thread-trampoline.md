## green thread trampoline `green-thread-trampoline`

Creates a 'green thread' object for running trampoline functions in cycles constrained by a share on frequency.

This is, if you want to run a client-side sort over a very large collection without locking the UI, you can use a trampoline friendly sort function to sort the array, not all in one go, but little by little over the course of several cycles.

``` deferred-example

require(
  [ 
    'd3'
  , 'underscore'
  , '@zambezi/fun/array/trampoline-merge-sort'
  , 'd3-utils/green-thread-trampoline'
  ]
, function(d3, _, sort, greenThread) {
    var collection = _.shuffle(_.range(10000))
      , thread = greenThread(sort(collection))
              .on('cycle.log', console.log.bind(console, 'PROGRESS! (cycle/total steps)'))
              .on('result.log', console.info.bind(console, 'DONE!'))

    console.debug('UNSORTED', collection)
    thread.start()

  }
)
```

This will run over several frames if needed.
You can configure `hertz` how often it'll run a cycle, and `share` to determine how much from that time the thread should use.

For example, 

``` deferred-example

require(
  [ 
    'd3'
  , 'underscore'
  , '@zambezi/fun/array/trampoline-merge-sort'
  , 'd3-utils/green-thread-trampoline'
  ]
, function(d3, _, sort, greenThread) {
    var collection = _.shuffle(_.range(10000))
      , thread = greenThread(sort(collection))
              .on('cycle.log', console.log.bind(console, 'PROGRESS! (cycle/total steps)'))
              .on('result.log', console.info.bind(console, 'DONE!'))
              .hertz(30)
              .share(0.1)

    console.debug('UNSORTED', collection)
    thread.start()

  }
)
```

Will run one cycle every 30th of a second, for 0.1 that alloted time, that is, 3.3 milliseconds for cycle.  
It'll run for as many cycles as needed until it finishes.
