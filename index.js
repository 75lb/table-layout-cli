class TableLayoutCli {
  constructor (options) {
    options = options || {}

    this.stdout = options.stdout || process.stdout
    this.stdin = require('stream').PassThrough()
  }

  go (argv) {
    const Table = require('table-layout')
    const commandLineArgs = require('command-line-args')
    const collectJson = require('collect-json')
    const extend = require('deep-extend')
    const t = require('typical')
    const cliData = require('./lib/cli-data')

    const options = commandLineArgs(cliData.definitions, { argv })

    if (options.help) {
      const os = require('os')
      const commandLineUsage = require('command-line-usage')
      const usage = commandLineUsage(cliData.usageSections)
      this.stdout.write(usage + os.EOL)
      this.stdin.end()
      return
    }

    const columns = []
    if (options.width) {
      options.width.forEach(function (columnWidth) {
        const split = columnWidth.split(':').map(function (item) {
          return item.trim()
        })
        if (split[0] && split[1]) {
          columns.push({ name: split[0], width: Number(split[1]) })
        }
      })
    }

    function getTable (json) {
      let clOptions = {
        maxWidth: process.stdout.columns,
        padding: {}
      }

      if (t.isDefined(options['padding-left'])) clOptions.padding.left = options['padding-left']
      if (t.isDefined(options['padding-right'])) clOptions.padding.right = options['padding-right']

      /* split input into data and options */
      if (!Array.isArray(json)) {
        if (json.options && json.data) {
          clOptions = extend(clOptions, json.options)
          json = json.data
        } else {
          throw new Error('Invalid input data')
        }
      }

      if (columns.length) clOptions.columns = columns

      const table = new Table(json, clOptions)
      return table.toString()
    }

    this.stdin
      .pipe(collectJson(getTable))
      .on('error', err => {
        console.error(err)
        process.exitCode = 1
      })
      .pipe(this.stdout)
  }
}

module.exports = TableLayoutCli
