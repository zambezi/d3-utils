define(
  [ ]
, function() {

    var extractPair = /\((-?[0-9.]+),(-?[0-9.]+)\)/

    return function fromTranslate(translateString) {
      var groups = extractPair.exec(translateString)
      if (!groups) return undefined
      return { x: parseFloat(groups[1]), y: parseFloat(groups[2]) }
    }
  }
)
