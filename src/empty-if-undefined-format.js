import { emptyIfFormat } from './empty-if-format'
import { partial, isUndefined } from 'underscore'

// to be used for wrapping normal formatters:
//
//    format = _.wrap(d3.time.format('%x'), empty)
//
// will create a function that returns an empty string if the provided value
// is undefined. Otherwise it'll try to parse it using the d3 formatter.

export const emptyIfUndefinedFormat = partial(emptyIf, isUndefined)
