## radial tween  `svg/radial-tween`

A tweener for radial transitions around a center for tweening SVG objects.

    var radial = require('d3-utils/svg/radial-tween')()

    radial.center({x: 100, y: 100 })

    d3.select('svg').selectAll('circle')
      .transition()
        .duration(1000)
        .tween('transform', radial)

... where the data bound to the objects, the `circle` elements in this example, have an `r` (for radius) and `a` (for angle, angle in radians) properties.  The tweener, when run, will figure out the current relationship to the center, and will tween until the element has the new relationship (of radius and angle) to that same center.

If you need to extract the properties from the data elements in a different manner, you can configure the radial tweener with its `angle` and `radius` getter/setters.
For example, if your data item is an array `[0.234, 10]` where the first element is the angle, and the second one is the radius, you can write something like:

    radial.angle(first).radius(second)

    function first(d) {
      return d[0]
    }

    function second(d) {
      return d[1]
    }
