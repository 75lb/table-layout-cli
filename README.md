[![view on npm](https://badgen.net/npm/v/table-layout-cli)](https://www.npmjs.org/package/table-layout-cli)
[![npm module downloads](https://badgen.net/npm/dt/table-layout-cli)](https://www.npmjs.org/package/table-layout-cli)
[![Gihub repo dependents](https://badgen.net/github/dependents-repo/75lb/table-layout-cli)](https://github.com/75lb/table-layout-cli/network/dependents?dependent_type=REPOSITORY)
[![Gihub package dependents](https://badgen.net/github/dependents-pkg/75lb/table-layout-cli)](https://github.com/75lb/table-layout-cli/network/dependents?dependent_type=PACKAGE)
[![Node.js CI](https://github.com/75lb/table-layout-cli/actions/workflows/node.js.yml/badge.svg)](https://github.com/75lb/table-layout-cli/actions/workflows/node.js.yml)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](https://github.com/feross/standard)

# table-layout-cli

Styleable plain-text table generator. Useful for formatting console output. Available as both a command-line tool and isomorphic [Javascript library](https://github.com/75lb/table-layout).

## Synopsis

Install the `table-layout` command-line app:

```
$ npm install --global table-layout

```

As input, table-layout takes a JSON file containing an array of objects.

```json
[
  {
    "country": "USA",
    "GDP": "$19,485,394,000,000",
    "population": "325,084,756"
  },
  {
    "country": "China",
    "GDP": "$12,237,700,479,375",
    "population": "1,421,021,791"
  },
  {
    "country": "Japan",
    "GDP": "$4,872,415,104,315",
    "population": "127,502,725"
  }
]
```

The output of table-layout is a configurable plain-text table.

```
$ cat example/gdp.json | table-layout

 USA    $19,485,394,000,000  325,084,756
 China  $12,237,700,479,375  1,421,021,791
 Japan  $4,872,415,104,315   127,502,725

```

## Examples

Please see below for example usage on the command-line.

### View Github issues

A quick way to see the latest issues on a repository (this example requires [jq](https://stedolan.github.io/jq/)).

```sh
$ curl -s https://api.github.com/repos/npm/npm/issues \
| jq 'map({ number, title, login:.user.login, comments })' \
| table-layout
```

```
10263  npm run start                                            Slepperpon        4
10262  npm-shrinkwrap.json being ignored for a dependency of a  maxkorp           0
      dependency (2.14.9, 3.3.10)
10261  EPROTO Error Installing Packages                         azkaiart          2
10260  ENOENT during npm install with npm v3.3.6/v3.3.12 and    lencioni          2
      node v5.0.0
10259  npm install failed                                       geraldvillorente  1
10258  npm moves common dependencies under a dependency on      trygveaa          2
      install
10257  [NPM3] Missing top level dependencies after npm install  naholyr           0
10256  Yo meanjs app creation problem                           nrjkumar41        0
10254  sapnwrfc is not installing                               RamprasathS       0
10253  npm install deep dependence folder "node_modules"        duyetvv           2
10251  cannot npm login                                         w0ps              2
10250  Update npm-team.md                                       louislarry        0
10248  cant install module I created                            nousacademy       4
10247  Cannot install passlib                                   nicola883         3
10246  Error installing Gulp                                    AlanIsrael0       1
10245  cannot install packages through NPM                      RoyGeagea         11
10244  Remove arguments from npm-dedupe.md                      bengotow          0
 etc.
 etc.
```

### Format an article into columns

Formatting long chunks of text into columns for display side by side.

```json
[
    {
      "column 1": "The Kingdom of Scotland was a state in north-west Europe traditionally said to have been founded in 843, which joined with the Kingdom of England to form a unified Kingdom of Great Britain in 1707. Its territories expanded and shrank, but it came to occupy the northern third of the island of Great Britain, sharing a land border to the south with the Kingdom of England. ",
      "column 2": "Operation Barbarossa (German: Unternehmen Barbarossa) was the code name for Nazi Germany's invasion of the Soviet Union during World War II, which began on 22 June 1941. Over the course of the operation, about four million soldiers of the Axis powers invaded Soviet Russia along a 2,900 kilometer front, the largest invasion force in the history of warfare. In addition to troops, the Germans employed some 600,000 motor vehicles and between 600–700,000 horses."
    }
]
```

Output:

```
$ cat example/two-columns.json | table-layout

The Kingdom of Scotland was a state in     Operation Barbarossa (German: Unternehmen
north-west Europe traditionally said to    Barbarossa) was the code name for Nazi
have been founded in 843, which joined     Germany's invasion of the Soviet Union
with the Kingdom of England to form a      during World War II, which began on 22
unified Kingdom of Great Britain in 1707.  June 1941. Over the course of the
Its territories expanded and shrank, but   operation, about four million soldiers of
it came to occupy the northern third of    the Axis powers invaded Soviet Russia
the island of Great Britain, sharing a     along a 2,900 kilometer front, the
land border to the south with the Kingdom  largest invasion force in the history of
of England.                                warfare. In addition to troops, the
                                           Germans employed some 600,000 motor
                                           vehicles and between 600–700,000 horses.
```

Notice the columns above have equal width - this is the default style. You can give one or more columns a specific width using the `--width` option. In the example below we give "column 2" a specific width of 55 characters:

```
$ cat example/two-columns.json | table-layout --width "column 2: 55"

The Kingdom of Scotland was a  Operation Barbarossa (German: Unternehmen Barbarossa)
state in north-west Europe     was the code name for Nazi Germany's invasion of the
traditionally said to have     Soviet Union during World War II, which began on 22
been founded in 843, which     June 1941. Over the course of the operation, about
joined with the Kingdom of     four million soldiers of the Axis powers invaded
England to form a unified      Soviet Russia along a 2,900 kilometer front, the
Kingdom of Great Britain in    largest invasion force in the history of warfare. In
1707. Its territories          addition to troops, the Germans employed some 600,000
expanded and shrank, but it    motor vehicles and between 600–700,000 horses.
came to occupy the northern
third of the island of Great
Britain, sharing a land
border to the south with the
Kingdom of England.
```

## Include configuration options with the input

Table-layout expects an array of objects as the input. However, if the input data is a plain object with the fields `options` and `data` defined then these properties will be used as the table options and data respectively. Example:

```
{
    "options": {
        "noTrim": true,
        "columns": [
            { "name": "name", "width": 25 },
            { "name": "description", "width": 20 },
            { "name": "html_url", "width": 20, "break": true },
            { "name": "stargazers_count", "width": 5 }
        ]
    },
    "data": [
      ...
    ]
}
```


Please see [this folder](https://github.com/75lb/table-layout-cli/tree/master/example) for examples of input containing both options and data.

## Full command-line usage guide:

```
table-layout

  Styleable plain-text table generator. Useful for formatting console output.

Synopsis

  $ cat json-file | table-layout [options]
  $ table-layout [options] json-file

Options

  --file string                A JSON input file to read. If not present, table-layout will look for input
                               on stdin.
  -w, --width widths           specify a list of column widths in the format '<column>:<width>', for
                               example:
                               $ cat <file> | table-layout --width "column 1: 10" "column 2: 30"
  -l, --padding-left string    One or more characters to pad the left of each column. Defaults to ' '.
  -r, --padding-right string   One or more characters to pad the right of each column. Defaults to ' '.
  -h, --help
```

* * *

&copy; 2015-24 Lloyd Brookes \<75pound@gmail.com\>.
