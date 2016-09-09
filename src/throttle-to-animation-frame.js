export function throttleToAnimationFrame(component) {

  let requestId

  return function run() {
    const context = this
        , args = arguments

    if (requestId) return

    requestId = window.requestAnimationFrame(execute)

    function execute() {
      component.apply(context, args)
      requestId = null
    }
  }
}
