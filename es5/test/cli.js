'use strict';

var TableLayoutCli = require('../../');
var collectAll = require('collect-all');
var TestRunner = require('test-runner');
var a = require('core-assert');

var runner = new TestRunner();

runner.test('cli: no args', function () {
  var cli = new TableLayoutCli({
    stdout: collectAll(function (stdout) {
      a.ok(/test/.test(stdout));
    })
  });

  cli.go([]);
  cli.stdin.end('[ { "one": "test" } ]');
});

runner.test('cli: help', function () {
  var cli = new TableLayoutCli({
    stdout: collectAll(function (stdout) {
      a.ok(/Synopsis/.test(stdout));
    })
  });

  cli.go(['--help']);
});