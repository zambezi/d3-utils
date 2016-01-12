define(
  []
, function() {
    return function perIndexDelay(ms, offset) {
      return function delay(d, i) {
        return i * ms + (offset || 0)
      }
    }
  }
)
