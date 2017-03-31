export function each (c) {
  return function each (s) {
    return s.each(then)
    function then () {
      c.apply(this, arguments)
    }
  }
}
