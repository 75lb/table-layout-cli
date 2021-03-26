import TableLayoutCli from './index.mjs'
import TestRunner from 'test-runner'
import assert from 'assert'
const a = assert.strict

const tom = new TestRunner.Tom()

tom.test('no args', async function () {
  const cli = new TableLayoutCli()
  const result = await cli.go([], '[ { "one": "test" } ]')
  a.ok(/test/.test(result))
})

tom.test('help', async function () {
  const cli = new TableLayoutCli()
  const result = await cli.go(['--help'])
  a.ok(/Synopsis/.test(result))
})

export default tom
