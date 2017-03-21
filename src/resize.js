import { select } from 'd3-selection'
import { uniqueId, debounce } from 'underscore'

export function createResize () {
  const type = uniqueId('resize.resize_')
  const w = select(window)

  let wait = 300

  function resize (s) {
    s.on('destroy.resize', () => w.on(type, null))
    w.on(type, debounce(onWindowResize, wait))

    function onWindowResize () {
      s.dispatch('size-dirty')
        .dispatch('redraw')
    }
  }

  resize.wait = function (value) {
    if (!arguments.length) return wait
    wait = value
    return resize
  }

  return resize
}
