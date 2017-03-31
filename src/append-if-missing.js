import { select } from 'd3-selection'
import { first, rest } from 'underscore'

export function appendIfMissing (tagAndClasses, initAttributes) {
  return function append (d, i) {
    const target = select(this)
    const selection = target.select(tagAndClasses)

    let elements
    let classes
    let tag
    let element

    if (!selection.empty()) return selection.node()

    elements = tagAndClasses.split('.')
    tag = first(elements)
    classes = rest(elements)

    element = target.append(tag)

    if (initAttributes) element.attr(initAttributes)
    if (classes.length) element.classed(classes.join(' '), true)

    return element.node()
  }
}
