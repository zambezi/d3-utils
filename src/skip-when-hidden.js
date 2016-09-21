import { select } from 'd3-selection'

export function skipWhenHidden(component) {

  return function run(s) {
    s.each(runEach)
  }

  function runEach() {
    if (!this.offsetParent) return
    select(this).call(component)
  }
}
