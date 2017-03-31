import { redispatch } from '../src'
import { strictEqual } from 'assert'
import { dispatch as createDispatcher } from 'd3-dispatch'

describe('redispatch', () => {
  it('should redispatch events from original dispatchers', () => {
    const dispatcher1 = createDispatcher('a', 'b')
    const dispatcher2 = createDispatcher('c')
    const forward = redispatch()
              .from(dispatcher1, 'a', 'b')
              .from(dispatcher2, 'c')()

    let result1
    let result2
    let result3

    forward
        .on('a', (r) => (result1 = r))
        .on('b', (r) => (result2 = r))
        .on('c', (r) => (result3 = r))

    dispatcher1.call('a', {}, 'A')
    strictEqual(result1, 'A')

    dispatcher1.call('b', {}, 'B')
    strictEqual(result2, 'B')

    dispatcher2.call('c', {}, 'C')
    strictEqual(result3, 'C')
  })

  it('should call the handler with the original context', () => {
    const dispatcher1 = createDispatcher('a', 'b')
    const forward = redispatch().from(dispatcher1, 'a', 'b')()
    const context1 = { id: 'A' }
    const context2 = { id: 'B' }

    forward.on('a', function handler () { strictEqual(this, context1) })
    forward.on('b', function handler () { strictEqual(this, context2) })

    dispatcher1.call('a', context1)
    dispatcher1.call('b', context2)
  })

  it('should support redispatching the same event from multiple sources', () => {
    const dispatcher1 = createDispatcher('a')
    const dispatcher2 = createDispatcher('a')
    const forward = redispatch()
              .from(dispatcher1, 'a')
              .from(dispatcher2, 'a')()

    forward.on('a', e => strictEqual(e, 1))
    dispatcher1.call('a', {}, 1)

    forward.on('a', e => strictEqual(e, 2))
    dispatcher2.call('a', {}, 2)
  })
})
