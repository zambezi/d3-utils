export function createDispatchCustomEvent() {
  let type
    , canBubble = true
    , cancelable = true
    , detail

  function dispatchCustomEvent(d, i)  {
    const evt = document.createEvent('CustomEvent')
    evt.initCustomEvent(type, canBubble, cancelable, detail)
    this.dispatchEvent(evt)
  }

  dispatchCustomEvent.type = function(value) {
    if (!arguments.length) return type
    type = value
    return dispatchCustomEvent
  }

  dispatchCustomEvent.canBubble = function(value) {
    if (!arguments.length) return canBubble
    canBubble = value
    return dispatchCustomEvent
  }

  dispatchCustomEvent.cancelable = function(value) {
    if (!arguments.length) return cancelable
    cancelable = value
    return dispatchCustomEvent
  }

  dispatchCustomEvent.detail = function(value) {
    if (!arguments.length) return detail
    detail = value
    return dispatchCustomEvent
  }

  return dispatchCustomEvent
}
