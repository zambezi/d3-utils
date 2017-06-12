import { select } from 'd3-selection'

export function setContentIfMissing (content, selector) {
  return function setContent (d, i) {
    const target = select(this)
    const selection = target.select(selector)

    if (!selection.empty()) return selection.node()

    target.html(content)

    return target.select(selector).node()
  }
}
