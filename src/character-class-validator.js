define(function(require) {

  var d3 = require('d3')
    , _ = require('underscore')

  return function createCharacterClassValidator() {

    var characterClass
      , validCharacters = regexFromCharacterClass(characterClass)

    function characterClassValidator() {
      return characterClassValidator.validate()
    }

    characterClassValidator.characterClass = function(value) {
      if (!arguments.length) return characterClass
      characterClass = value
      validCharacters = regexFromCharacterClass(characterClass)
      return characterClassValidator
    }

    characterClassValidator.validate = function(d, i) {
      var charCode
        , isValidChar

      if (_.isUndefined(characterClass)) return

      charCode = String.fromCharCode(d3.event.which || d3.event.charCode)
      isValidChar = validCharacters.test(charCode)
      if (!isValidChar) d3.event.preventDefault()
    }

    return characterClassValidator

  }

  function regexFromCharacterClass(characterClass) {
    return new RegExp('[' + characterClass + ']')
  }

})
