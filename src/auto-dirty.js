export function createAutoDirty() {

  let autoSizeDirty = true
    , autoDataDirty = true

  function autoDirty(component) {
    return function run(s) {
      if (autoSizeDirty) s.dispatch('size-dirty', { bubbles: true })
      if (autoDataDirty) s.dispatch('data-dirty', { bubbles: true })
      return s.call(component)
    }
  }

  autoDirty.autoSizeDirty = function(value) {
    if (!arguments.length) return autoSizeDirty
    autoSizeDirty = value
    return autoDirty
  }

  autoDirty.autoDataDirty = function(value) {
    if (!arguments.length) return autoDataDirty
    autoDataDirty = value
    return autoDirty
  }

  return autoDirty

}
