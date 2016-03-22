var keys = Object.keys(window.__karma__.files)
  , isTest = /\.test\.js$/
  , tests = keys.filter(onlyTests)

requirejs.config(
  {
      baseUrl: '/base'
    , paths: {
        '@zambezi/fun': 'node_modules/@zambezi/fun'
      , 'Squire': 'node_modules/squirejs/src/Squire'
      , 'd3': 'node_modules/d3/d3'
      , 'd3-utils': 'd3-utils'
      , 'jquery': 'node_modules/jquery/dist/jquery'
      , 'sinon': 'node_modules/karma-sinon-chai/node_modules/sinon/lib/sinon'
      , 'text': 'node_modules/text/text'
      , 'underscore': 'node_modules/underscore/underscore'
    }
    , shim : {
        d3: { exports: 'd3' }
      , sinon: { exports: 'sinon' }
    }
  }
)

require(
    ['jquery']
  , function($) {
    window.Sizzle = $.find // Expose Sizzle to D3
    require(tests, window.__karma__.start)
  }
)

function onlyTests(file) {
  return isTest.test(file)
}