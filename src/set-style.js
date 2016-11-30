import { appendIfMissing } from './append-if-missing'
import { select } from 'd3-selection'

const styleBySelector = {}
let sheet

export function setStyle(selector, values) {

  confirmSheetAndId()

  const style = styleFor(selector)

  Object.keys(values).forEach(setStyle)

  function setStyle(key) {
    const value = values[key]
    if (style[key] === value) return
    style[key] = value
  }
}

function confirmSheetAndId() {
  sheet || (sheet = createSheet())
}

function createSheet() {
  return select('head')
    .select(appendIfMissing('style.zambezi-styles'))
    .property('sheet')
}

function styleFor(fullSelector) {
  let style = styleBySelector[fullSelector]
  if (style) return style
  style = styleForSelector(fullSelector, sheet)
  styleBySelector[fullSelector] = style
  return style
}

function styleForSelector(selector, sheet) {
  let style
  const rules = sheet.cssRules
    , ruleExists = Array.prototype.some.call(rules, findRule)

  if (ruleExists) return style
  insertRule()
  return rules[rules.length - 1].style

  function findRule(r) {
    if (r.selectorText !== selector) return false
    style = r.style
    return true
  }

  function insertRule() {
    sheet.insertRule(selector + "{}" , rules.length)
  }
}