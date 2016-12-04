'use strict'
var detect = require('feature-detect-es6')

if (detect.all('class', 'arrowFunction', 'let', 'const')) {
  module.exports = require('./src/lib/table-layout-cli')
} else {
  module.exports = require('./es5/lib/table-layout-cli')
}
