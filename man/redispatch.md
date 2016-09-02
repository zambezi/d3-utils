## redispatch

Allows the consolidation of event APIs from multiple components for easier component composition.

Given the following subcomponents and dispatchers,

```javascript
import { dispatch } from 'd3-dispatch'

const a = dispatch('a', 'b', 'c')
    , b = dispatch('d', 'e')
    , c = dispatch('f')
```

... a unified dispatcher can be created,

```javascript
const events = redispatch
          .from(a, 'a', 'b')
          .from(b, 'd', 'e')
          .from(c, 'f')
        .create()
```

... so that the client can attach all the handlers at one level,

```javascript
events
    .on('a', onA)
    .on('d', onD)
    .on('f', onF)

a.call('a') // ⇒ will trigger onA

c.call('f', context, 'ΑΒΓ') // ⇒ will trigger onF, on context, with 'ΑΒΓ'
```
