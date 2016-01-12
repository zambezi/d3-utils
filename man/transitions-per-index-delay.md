## transition per index delay `transitions/per-index-delay`

Utility function to be able to configure delays for elements based on their index on the selection.

For example, to fade in in a staggered way you could 

        d3.selectAll('.side-panel > .item')
          .transition()
            .duration(500)
            .delay(perIndexDelay(300))
            .style('opacity', 1)

The argument is the delay per element. So the first element will start transitioning at 0, the second one at 300, the third at 600, etc.

You can pass an optional second argument, `offset` which will be added to all the delays.
In our example, if we do:

            .delay(perIndexDelay(300, 100))

The first element will start transitioning at 100, the second at 400, etc.
