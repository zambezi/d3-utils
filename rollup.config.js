import babel from 'rollup-plugin-babel'
import babelrc from 'babelrc-rollup'

export default {
  entry: 'src/index.js',
  dest: 'dist/d3-utils.js',
  format: 'umd',
  moduleName: 'd3Utils',
  external: [
    'd3-selection',
    'd3-dispatch',
    'd3-request',
    'underscore'
  ],
  sourceMap: true,
  plugins: [ babel(babelrc()) ],
  globals: {
    'underscore': '_',
    'd3-selection': 'd3',
    'd3-dispatch': 'd3',
    'd3-request': 'd3'
  }
}
