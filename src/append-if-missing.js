import { select } from 'd3-selection'
import { first, rest } from 'underscore'

export function appendIfMissing(tagAndClasses, initAttributes) {

  return function append(d, i) {
    const target = select(this)
      , selection = target.select(tagAndClasses)

    let elements
      , classes
      , tag
      , element

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
