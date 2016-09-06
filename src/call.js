export function call(component) {
  return function call(s) {
    return s.call(component)
  }
}
