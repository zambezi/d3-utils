

// Reconfigurable higher-level component, it receives a D3 component, not a
// selection, and will return a new component that will dispatch 'size-dirty'
// and 'data-dirty' every time it's run, just before running the original,
// provided component.

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
