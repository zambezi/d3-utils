define(
  []
, function() {
    return function setContentIfMissing(content, selector) {
      return function setContent(s) {
        if (s.select(selector).empty()) s.html(content)
      }
    }
  }
)
