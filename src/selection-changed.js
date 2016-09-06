import { uniqueId } from 'underscore'

export function selectionChanged() {

  const previousDataKey = uniqueId('__data-changed-')

  let debug = false
    , key

  function changed(d, i) {

    if (!key) {
      if (debug) console.debug('--(KEY UNDEFINED)--')
      return this
    }

    const oldKey = this[previousDataKey]
        , newKey = key.call(this, d, i)

    this[previousDataKey] = newKey

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
