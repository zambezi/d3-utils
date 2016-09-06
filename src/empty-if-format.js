import { rest } from 'underscore'

export function emptyIfFormat(predicate, fn, d) {
  if (predicate(d)) return ''
  return fn.apply(this, rest(rest(arguments)))
}
