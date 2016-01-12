define(
  [ 'd3' ]
, function(d3) {
    var hasNativeSupport = checkNativeSupport()
      , measure = d3.select(document.createElement('span'))
          .call(styleMeasure)

    return function() {
      var lines = 3
        , forceBruteForce = false

      function clamp(s) {
        s.each(
          function (d, i) {
            d3.select(this).call(
              hasNativeSupport && !forceBruteForce 
            ? clampNicely 
            : clampBruteForce
            )
          }
        )
      }

      clamp.lines = function(value) {
        if (!arguments.length) return lines
        lines = value
        return clamp
      }

      clamp.forceBruteForce = function(value) {
        if (!arguments.length) return forceBruteForce
        forceBruteForce = value
        return clamp
      }

      return clamp

      function clampNicely(element) {
        element.style('overflow', 'hidden')
            .style('text-overflow', 'ellipsis')
            .style('-webkit-box-orient', 'vertical')
            .style('display', '-webkit-box')
            .style('-webkit-line-clamp', lines)
      }

      function clampBruteForce(element) {
        // Wraps Vesa Piittinen multiline ellipsis solution
        // http://codepen.io/Merri/pen/Dsuim
        var lineStart = 0
          , wordStart = 0
          , lineCount = 1
          , lineText
          , wasNewLine = false
          , lineWidth = element.property('clientWidth')
          , text = element.text()
                .replace(/\n/g, ' ')
                .replace(/\s{2,}/g, ' ')
                .trim() 

        element.html('').select(appendMeasure)

        // Split into lines all the lines except the last.
        text.replace(/\s+|$/g , chopWords)

        element.node().removeChild(measure.node())

        // Add the rest of the text to the last single line with ellipsis.
        element.append('span')
            .style('display', 'block')
            .style('overflow', 'hidden')
            .style('text-overflow', 'ellipsis')
            .style('white-space', 'nowrap')
            .style('width', '100%')
            .text(text.substr(lineStart))

        function chopWords(match, offset) {
          var textCandidate = text.substr(lineStart, offset - lineStart)
            , line 

          if (lineCount === lines) return 

          measure.text(textCandidate)

          if (lineWidth < measure.property('clientWidth')) {
            if (wasNewLine) { // Long word on its own
              lineText = text.substr(lineStart, offset + 1 - lineStart)
              lineStart = offset + 1
            } else {
              lineText = text.substr(lineStart, wordStart - lineStart)
              lineStart = wordStart
            }

            line = element.append('span').text(lineText)

            wasNewLine = true
            lineCount++
          } else {
            wasNewLine = false
          }

          wordStart = offset + 1
          measure.html('')

        }
      }
    }

    function appendMeasure() {
      return this.appendChild(measure.node())
    }

    function styleMeasure(s) {
      s.style('position', 'absolute')
        .style('white-space', 'pre')
        .style('visibility', 'hidden')
    }

    function checkNativeSupport() {
     return typeof(document.body.style.webkitLineClamp) != 'undefined'
    }
  }
)
