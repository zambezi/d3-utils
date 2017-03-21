export function forward (dispatcher, type) {
  return function forward () {
    dispatcher.call(type, this, ...arguments)
  }
}
