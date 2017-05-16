import { select } from 'd3-selection'

export function setContentIfEmpty (content) {
  return function setContent (d, i) {
    const target = select(this)

    if (this.hasChildNodes()) return this.firstChild

    target.html(content)

    return this.firstChild
  }
}
