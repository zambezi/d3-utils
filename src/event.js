import { select, event } from 'd3-selection'

export function fromTarget(fn) {
  return function handler() {
    select(event.target).each(fn)
  }
}
export function fromDetail(fn) {
  return function handler() {
    fn.call(this, event.detail)
  }
}
