#!/usr/bin/env node
import TableLayoutCli from '../index.mjs'

async function start () {
  const cli = new TableLayoutCli()
  const result = await cli.go()
  console.log(result)
}

start().catch(console.error)
