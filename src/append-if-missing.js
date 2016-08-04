import { select } from 'd3-selection'

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
    tag = _.first(elements)
    classes = _.rest(elements)

    element = target.append(tag)

    if (initAttributes) element.attr(initAttributes)
    if (classes.length) element.classed(classes.join(' '), true)

    return element.node()
  }

}
