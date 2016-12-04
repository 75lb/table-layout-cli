#!/usr/bin/env node
'use strict'
var detect = require('feature-detect-es6')
var TableLayoutCli

if (detect.all('class', 'arrowFunction', 'let', 'const')) {
  TableLayoutCli = require('./src/lib/table-layout-cli.js')
} else {
  TableLayoutCli = require('./es5/lib/table-layout-cli.js')
}

var cli = new TableLayoutCli()
process.stdin.pipe(cli.stdin)
cli.go()
