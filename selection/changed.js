define(
  [ ]
, function() {

    return function() {
      var key
        , previousDataKey = randomDataKey()
        , debug

      function changed(d, i) {
        var oldKey = this[previousDataKey]
          , newKey

        if (!key) { 
          if (debug) console.debug('--(KEY UNDEFINED)--')
          return this 
        }

        newKey = key.call(this, d, i)
        this[previousDataKey] =  newKey

        if (debug) console.debug(
          'selection changed?'
        , 'old:'
        , oldKey
        , 'new:'
        , newKey
        , newKey === oldKey ? '--(SAME)--' : '++(CHANGED)++'
        )

        return oldKey === newKey ? null : this
      }

      changed.debug = function(value) {
        if (!arguments.length) return debug
        debug = value
        return changed
      }

      changed.key = function(value) {
        if (!arguments.length) return key
        key = value
        return changed
      }

      return changed
    }

    function randomDataKey() {
      return (
        '__data-changed-'
      + (
          Date.now().toString(16) 
        + '-' 
        + Math.ceil(Math.random() * 0xFFFFFF).toString(16)
        ).toUpperCase()
      + '__'
      )
    }
  }
)
