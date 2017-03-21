import { event } from 'd3-selection'

export function keyCodeHandler (fun, code) {
  return function handler () {
    const matched = event.keyCode === code
    if (!matched) return undefined
    fun.apply(this, arguments)
    return matched
  }
}
