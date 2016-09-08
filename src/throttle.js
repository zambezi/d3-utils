import { rest, throttle as thr } from 'underscore'

export function throttle(component, wait=150) {

  console.info('create throttle', wait)

  const throttled = thr(execute, wait)

  return function run() {
    throttled.apply(this, arguments)
  }

  function execute() {
    console.group('execute from throttle')
    component.apply(this, arguments)
    console.groupEnd('execute from throttle')
  }
}
