import { dispatch as createDispatch } from 'd3-dispatch'
import { createResize } from './rebind'

export function redispatch() {
  const dispatchers = []

  function redispatch() {

    const dispatch = createDispatch.apply(null, dispatchers.reduce(types, []))

    dispatchers.forEach(proxyEvents)
    return dispatch

    function proxyEvents(d) {
      d.types.forEach(proxyEvent)
      function proxyEvent(type) {
        d.dispatcher.on(`${type}.redispatcher`, forward)
        function forward() {
          dispatch.apply(type, this, arguments)
        }
      }
    }
  }

  redispatch.from = (dispatcher, ...types) => {
    dispatchers.push({ dispatcher, types })
    return redispatch
  }

  redispatch.eventTypes = () => {
    return dispatchers.reduce(toTypes, [])
  }

  return redispatch

  function types(acc, next) {
    return acc.concat(next.types)
  }

  function toTypes(acc, v, k) {
    return acc.concat(v.types)
  }

}
