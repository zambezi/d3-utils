import { event } from 'd3-selection'

export function createCharacterClassValidator () {
  let characterClass
  let validCharacters = regexFromCharacterClass(characterClass)

  function characterClassValidator () {
    return characterClassValidator.validate()
  }

  characterClassValidator.characterClass = function (value) {
    if (!arguments.length) return characterClass
    characterClass = value
    validCharacters = regexFromCharacterClass(characterClass)
    return characterClassValidator
  }

  characterClassValidator.validate = function (d, i) {
    let charCode,
      isValidChar

    if (typeof (characterClass) === 'undefined') return

    charCode = String.fromCharCode(event.which || event.charCode)
    isValidChar = validCharacters.test(charCode)
    if (!isValidChar) event.preventDefault()
  }

  return characterClassValidator
}

function regexFromCharacterClass (characterClass) {
  return new RegExp('[' + characterClass + ']')
}
