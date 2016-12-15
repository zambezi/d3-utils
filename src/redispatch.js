import { dispatch as createDispatch } from 'd3-dispatch'
import { createResize } from './rebind'
import { unique } from 'underscore'

export function redispatch() {
  const dispatchers = []

  function redispatch() {
    return redispatch.create()
  }

  redispatch.from = (dispatcher, ...types) => {
    dispatchers.push({ dispatcher, types })
    return redispatch
  }

  redispatch.eventTypes = () => {
    return dispatchers.reduce(toTypes, [])
  }

  redispatch.create = () => {
    const dispatch = createDispatch.apply(
            null
          , unique(dispatchers.reduce(types, []))
          )

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

  return redispatch

  function types(acc, next) {
    return acc.concat(next.types)
  }

  function toTypes(acc, v, k) {
    return acc.concat(v.types)
  }

}
