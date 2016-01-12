define(
  ['d3']
, function (d3) {
    return function() {

      var format = String

      function safeUpdateInputValue(s) {
        s.each(safeUpdateInputValueEach)
      }

      safeUpdateInputValue.format = function(value) {
        if (!arguments.length) return format

        format = value

        return safeUpdateInputValue
      }

      return safeUpdateInputValue

      function safeUpdateInputValueEach(d, i) {
        var input = d3.select(this)
          , selectionStart = input.property('selectionStart')
          , selectionEnd = input.property('selectionEnd')

        input.property('value', format)
          .filter(isFocused)
            .property('selectionStart', selectionStart)
            .property('selectionEnd', selectionEnd)

      }
      function isFocused() {
        return document.activeElement === this
      }
    }
  }
)