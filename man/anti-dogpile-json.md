## anti dogpile json

A replacement for `d3.json` (for *GET* calls) that will reuse live/in-flight requests for fetching the same URL.
This is not a caching mechanism: as soon as the request loads, the request will be cleared.

```javascript
const json = createAntiDogpileJson()

json(url)
  .on('error', onError)
  .on('load', onLoad)
  .get()
```

### Rationale

It can become difficult to prevent making networking calls to the same resource from one component, yet alone
many components. To better manage this, a global or shared component can be used to provide an anti dogpile
json instance, so that any live/in-flight requests can be used when fetching the same URL.
