define(
  [ 'underscore' ]
, function(_) {
    return function() {
      var objects = []

      function rebind(target) {
        return objects.reduce(rebindForObject, target)
      }

      rebind.from = function(source) {
        objects.push({ source: source, properties: _.rest(arguments) })
        return rebind
      }

      return rebind

      function rebindForObject(target, current, index, array) {

        var source = current.source
        current.properties.forEach(rebindProperty)

        return target

        function rebindProperty(name) {
          var i = name.indexOf(':')
            , same = !~i
            , sourceName = same ? name : name.substring(0, i)
            , targetName = same ? name : name.substring(i + 1)

          target[targetName] = r(target, source, source[sourceName])

          function r(target, source, method) {
            return function proxy() {
              var value = method.apply(source, arguments)
              return value === source ? target : value
            }
          }
        }
      }
    }
  }
)
