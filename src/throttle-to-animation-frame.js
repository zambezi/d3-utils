export function throttleToAnimationFrame(component) {

  let requestId

  return function run() {
    const context = this
        , args = arguments

    console.group('run from RAN')

    if (requestId) {
      console.warn('skip redraw, already scheduled')
      console.groupEnd('run from RAN')
      return
    }

    requestId = window.requestAnimationFrame(execute)

    console.groupEnd('run from RAN')

    function execute() {
      console.group('execute from RAN')
      component.apply(context, args)
      requestId = null
      console.groupEnd('execute from RAN')
    }

  }
}
