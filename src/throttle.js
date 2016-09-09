import { rest, throttle as thr } from 'underscore'

export function throttle(component, wait=150) {
  const throttled = thr(execute, wait)

  return function run() {
    throttled.apply(this, arguments)
  }

  function execute() {
    component.apply(this, arguments)
  }
}
