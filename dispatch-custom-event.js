define(
  []
, function() {
    return function(type, canBubble, cancelable, detail) {
      return function dispatch(d, i)  {
        var evt = document.createEvent('CustomEvent')
        evt.initCustomEvent(type, canBubble, cancelable, detail)
        this.dispatchEvent(evt)
      }
    }
  }
)
