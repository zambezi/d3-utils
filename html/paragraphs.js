define(
  [ 'd3' ]
, function(d3) {
    return function() {

      function paragraphs(s) {
        s.each(paragraphsEach)
      }

      return paragraphs

      function paragraphsEach(d, i) {
        var update = d3.select(this).selectAll('p').data(d || [])

        update.enter().append('p')
        update.exit().remove()
        update.html(String)
      }
    }
  }
)
