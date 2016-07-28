import { rest } from 'underscore'

export function rebind() {
  const objects = []

  function rebind(target) {
    return objects.reduce(rebindForObject, target)
  }

  rebind.from = function(source) {
    objects.push({ source, properties: rest(arguments) })
    return rebind
  }

  return rebind

  function rebindForObject(target, current, index, array) {

    const source = current.source
    current.properties.forEach(rebindProperty)

    return target

    function rebindProperty(name) {
      const i = name.indexOf(':')
          , same = !~i
          , sourceName = same ? name : name.substring(0, i)
          , targetName = same ? name : name.substring(i + 1)

      target[targetName] = r(target, source, source[sourceName])

      function r(target, source, method) {
        return function proxy() {
          const value = method.apply(source, arguments)
          return value === source ? target : value
        }
      }
    }
  }
}
