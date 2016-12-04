'use strict'
const TableLayoutCli = require('../../')
const collectAll = require('collect-all')
const TestRunner = require('test-runner')
const a = require('core-assert')

const runner = new TestRunner()

runner.test('cli: no args', function () {
  const cli = new TableLayoutCli({
    stdout: collectAll(stdout => {
      a.ok(/test/.test(stdout))
    })
  })

  cli.go([])
  cli.stdin.end('[ { "one": "test" } ]')
})

runner.test('cli: help', function () {
  const cli = new TableLayoutCli({
    stdout: collectAll(stdout => {
      a.ok(/Synopsis/.test(stdout))
    })
  })

  cli.go([ '--help' ])
})
