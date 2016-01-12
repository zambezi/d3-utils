define(
  [ 
    'd3'
  , 'underscore' 
  ]
, function(d3, _) {
    return function appendIfMissing(tagAndClasses, initAttributes) {
      return function append(d, i) {
        var target = d3.select(this)
          , selection = target.select(tagAndClasses)
          , elements
          , classes 
          , tag
          , element

        if (!selection.empty()) return selection.node()

        elements = tagAndClasses.split('.')
        tag = _.first(elements)
        classes = _.rest(elements)

        element = target.append(tag)

        if (initAttributes) element.attr(initAttributes)
        if (classes.length) element.classed(classes.join(' '), true)

        return element.node()
      }
    }
  }
)
