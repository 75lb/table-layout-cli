const TableLayoutCli = require('./')
const collectAll = require('collect-all')
const Tom = require('test-runner').Tom
const a = require('assert')

const tom = module.exports = new Tom('test')

tom.test('no args', function () {
  const cli = new TableLayoutCli({
    stdout: collectAll(stdout => {
      a.ok(/test/.test(stdout))
    })
  })

  cli.go([])
  cli.stdin.end('[ { "one": "test" } ]')
})

tom.test('help', function () {
  const cli = new TableLayoutCli({
    stdout: collectAll(stdout => {
      a.ok(/Synopsis/.test(stdout))
    })
  })

  cli.go(['--help'])
})
