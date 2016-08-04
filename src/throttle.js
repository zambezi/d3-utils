import { rest, throttle as thr } from 'underscore'

export function throttle(component, wait=200) {
  const throttled = thr(execute, wait)
  return function run(s) {
    const args = rest(arguments)
        , context = this

    throttled.apply(context, [ s, ...args ])
  }

  function execute() {
    component.apply(this, arguments)
  }
}
