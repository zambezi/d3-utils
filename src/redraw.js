import { rest } from 'underscore'

export function redraw(component) {
  return function run(s) {
    const args = rest(arguments)
        , context = this

    s.on('redraw.component-redraw', draw)
    draw()

    function draw() {
      console.group('draw from redraw')
      component.apply(context, [ s, ...args ])
      console.groupEnd('draw from redraw')
    }
  }
}
