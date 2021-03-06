import { rebind } from '../src'
import { deepEqual, strictEqual } from 'assert'

describe('rebind', () => {
  it('source function always has source as context', () => {
    const target = {}
    const source = { method }

    let that

    rebind().from(source, 'method')(target)

    strictEqual((target.method(), that), source)
    strictEqual((target.method.call({}), that), source)

    function method () {
      that = this
    }
  })

  it("source function receives target function's arguments", () => {
    const target = {}
    const source = { method }

    let those

    rebind().from(source, 'method')(target)
    deepEqual((target.method(), those), [])
    deepEqual((target.method(1), those), [1])
    deepEqual((target.method(null), those), [null])
    deepEqual((target.method(source, source, 1), those), [source, source, 1])

    function method () {
      those = Array.prototype.slice.call(arguments)
    }
  })

  it('target function returns target if source function returns source', () => {
    const target = {}
    const source = { method: (value) => value ? source : 42 }

    rebind().from(source, 'method')(target)

    strictEqual(target.method(true), target)
  })
  it('otherwise, target function returns source function return value', () => {
    const target = {}
    const source = { method: function (value) { return value ? source : 42 } }
    rebind().from(source, 'method')(target)
    strictEqual(target.method(), 42)
  })

  it('can bind multiple methods', () => {
    const target = {}
    const source = {
      foo: function () { return 1 },
      bar: function () { return 2 }
    }

    rebind().from(source, 'foo', 'bar')(target)
    strictEqual(target.foo(), 1)
    strictEqual(target.bar(), 2)
  })

  it('returns the target object', () => {
    const target = {}
    const source = { foo: function () {} }

    strictEqual(rebind().from(source, 'foo')(target), target)
  })

  it('can bind methods from multiple sources', () => {
    const target = {}
    const sourceA = { foo: (value) => value ? sourceA : 42 }
    const sourceB = { bar: (value) => value ? sourceB : 'red' }
    const sourceC = { yeh: (value) => value ? sourceC : 24 }

    rebind()
        .from(sourceA, 'foo')
        .from(sourceB, 'bar')
        .from(sourceC, 'yeh')(target)

    strictEqual(target.foo(), 42)
    strictEqual(target.bar(), 'red')
    strictEqual(target.yeh(), 24)
  })
})
