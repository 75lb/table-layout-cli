'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TableLayoutCli = function () {
  function TableLayoutCli(options) {
    _classCallCheck(this, TableLayoutCli);

    options = options || {};

    this.stdout = options.stdout || process.stdout;
    this.stdin = require('stream').PassThrough();
  }

  _createClass(TableLayoutCli, [{
    key: 'go',
    value: function go(argv) {
      var Table = require('table-layout');
      var tool = require('command-line-tool');
      var collectJson = require('collect-json');
      var extend = require('deep-extend');
      var t = require('typical');
      var cliData = require('./cli-data');

      var cli = tool.getCli(cliData.definitions, cliData.usageSections, argv);
      var options = cli.options;

      if (options.help) {
        var os = require('os');
        this.stdout.write(cli.usage + os.EOL);
        this.stdin.end();
        return;
      }

      var columns = [];
      if (options.width) {
        options.width.forEach(function (columnWidth) {
          var split = columnWidth.split(':').map(function (item) {
            return item.trim();
          });
          if (split[0] && split[1]) {
            columns.push({ name: split[0], width: Number(split[1]) });
          }
        });
      }

      function getTable(json) {
        var clOptions = {
          maxWidth: process.stdout.columns,
          padding: {}
        };

        if (t.isDefined(options['padding-left'])) clOptions.padding.left = options['padding-left'];
        if (t.isDefined(options['padding-right'])) clOptions.padding.right = options['padding-right'];

        if (!Array.isArray(json)) {
          if (json.options && json.data) {
            clOptions = extend(clOptions, json.options);
            json = json.data;
          } else {
            throw new Error('Invalid input data');
          }
        }

        if (columns.length) clOptions.columns = columns;

        var table = new Table(json, clOptions);
        return table.toString();
      }

      this.stdin.pipe(collectJson(getTable)).on('error', tool.halt).pipe(this.stdout);
    }
  }]);

  return TableLayoutCli;
}();

module.exports = TableLayoutCli;