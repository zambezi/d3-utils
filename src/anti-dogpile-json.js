import { json } from 'd3-request'
import { rebind } from './rebind'
import { redispatch } from './redispatch'

export function createAntiDogpileJson () {
  const requestByURL = {}

  function antiDogpileJson (url) {
    const inFlight = !!requestByURL[url]
    const request = requestByURL[url] || createRequest(url)
    const dispatcher = redispatch()
          .from(request, 'beforesend', 'progress', 'load', 'error')
          .create()

    return rebind().from(dispatcher, 'on')({
      get () {
        if (inFlight) return
        request.get()
      }
    })
  }

  function createRequest (url) {
    const request = json(url)
        .on('load.dp error.dp', () => {
          delete requestByURL[url]
        })

    requestByURL[url] = request
    return request
  }

  return antiDogpileJson
}
