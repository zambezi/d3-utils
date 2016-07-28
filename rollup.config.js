import babel from 'rollup-plugin-babel'
import babelrc from 'babelrc-rollup'

export default {
  entry: 'src/index.js',
  dest: 'dist/d3-utils.js',
  format: 'umd',
  moduleName: 'd3Utils',
  external: [ 'underscore' ],
  sourceMap: true,
  plugins: [ babel(babelrc()) ],
  globals: {
    'underscore': '_'
  }
}
