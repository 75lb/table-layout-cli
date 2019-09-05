#!/usr/bin/env node
const TableLayoutCli = require('../')
const cli = new TableLayoutCli()
process.stdin.pipe(cli.stdin)
cli.go()
