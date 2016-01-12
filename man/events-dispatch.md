## dispatch `d3-utils/events/dispatch`

Creates a decorated d3 dispatcher that

* has a `hasListeners` method that will return if a particular event type has listeners.
* has a `first-subscribed` and a `last-unsubscribed` events that will be emitted if, respectively, someone listens a base namespace for the first time, and someone de-subscribes for the last time (i.e. there are no more listeners for the namespace).
Both events will have the namespace as only argument.

Dispatcher understands namespaces, so that:

    d = dispatch('data', 'error')
    d.on('data.ns1', handler)

    d.hasListeners('data') // true

*KNOWN ISSUE* Note that this dispatcher doesn't support un subscribing from all handlers for a name space.

    d = dispatch('data', 'error')
    d.on('data.ns1', handler)

    d.on('.ns1', null) // <=== will THROW and error!

Dispatcher last-unsubscribed and first-subscribed events example:
  var d = dispatch('message', 'status', 'error')

  d.on('first-subscribed', function(nameSpace) { ... })
  d.on('last-unsubscribed', function(nameSpace) { ... })

last-unsubscribed and first-subscribed events group events by namespace. For example:

 d.on('message', messageGenericHandler) // d will dispatch 'first-subscribed' on type 'message'
 d.on('message.a', messageAHandler) // d will **not** dispatch 'first-subscribed' on type 'message.a'

 d.on('message', null) // d will **not** dispatch 'last-unsubscribed' on type 'message'
 d.on('message.a', null) // d will dispatch 'last-unsubscribed' on type 'message'
