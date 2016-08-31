import { rest } from 'underscore'
import { select } from 'd3-selection'
import { uniqueId, debounce } from 'underscore'

export function createResize() {
  const type = uniqueId('resize.resize_')
      , w  = select(window)

  let wait = 300

  function resize(s) {
    w.on(type, debounce(onWindowResize, wait))

    function onWindowResize() {
      s.dispatch('redraw').dispatch('size-dirty')
    }
  }

  resize.wait = function(value) {
    if (!arguments.length) return wait
    wait = value
    return resize
  }

  return resize
}
