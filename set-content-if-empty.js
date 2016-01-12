define(
  []
, function() {
    return function populateIfEmpty(template) {
      return function populate(s) {
        if (s.node().hasChildNodes()) return
        s.html(template)
      }
    }
  }
)
