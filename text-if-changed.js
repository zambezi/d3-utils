define(
  [ 'd3' ]
, function(d3) {
    return function(text) {
      text = d3.functor(text)
      function updateText(s) {
        s.each(
          function eachText(d, i) {
            var element = d3.select(this)
              , newText = text.apply(this, arguments) 
            if (element.text() == newText) return 
            element.text(newText)
          }
        )
      }
      return updateText
    }
  }
)
