[![view on npm](http://img.shields.io/npm/v/table-layout-cli.svg)](https://www.npmjs.org/package/table-layout-cli)
[![npm module downloads](http://img.shields.io/npm/dt/table-layout-cli.svg)](https://www.npmjs.org/package/table-layout-cli)
[![Build Status](https://travis-ci.org/75lb/table-layout-cli.svg?branch=master)](https://travis-ci.org/75lb/table-layout-cli)
[![Dependency Status](https://badgen.net/david/dep/75lb/table-layout-cli)](https://david-dm.org/75lb/table-layout-cli)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](https://github.com/feross/standard)

# table-layout-cli
Format data in column or table layout on the command line.

## Install

```
$ npm install -g table-layout-cli
```

## Synopsis

Present npm issues from the Github API in table layout: (example requires [jq](https://stedolan.github.io/jq/))
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

The Github API data piped into `table-layout` in the above example looks something like this:

```
[
  {
    "number": 10263,
    "title": "npm run start",
    "login": "Slepperpon",
    "comments": 4
  },
  {
    "number": 10262,
    "title": "npm-shrinkwrap.json being ignored for a dependency of a dependency (2.14.9, 3.3.10)",
    "login": "maxkorp",
    "comments": 0
  },
  {
    "number": 10261,
    "title": "EPROTO Error Installing Packages",
    "login": "azkaiart",
    "comments": 2
  },
  etc.
  etc.
]
```

Here's an example of formatting text into columns. This input (one row, two columns):
```json
[
    {
      "column 1": "The Kingdom of Scotland was a state in north-west Europe traditionally said to have been founded in 843, which joined with the Kingdom of England to form a unified Kingdom of Great Britain in 1707. Its territories expanded and shrank, but it came to occupy the northern third of the island of Great Britain, sharing a land border to the south with the Kingdom of England. ",
      "column 2": "Operation Barbarossa (German: Unternehmen Barbarossa) was the code name for Nazi Germany's invasion of the Soviet Union during World War II, which began on 22 June 1941. Over the course of the operation, about four million soldiers of the Axis powers invaded Soviet Russia along a 2,900 kilometer front, the largest invasion force in the history of warfare. In addition to troops, the Germans employed some 600,000 motor vehicles and between 600–700,000 horses."
    }
]
```

..piped through `table-layout`:

```sh
$ cat example/two-columns.json | table-layout
```

..generates this output:

```
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

Notice the two columns have equal width, this is the default style. You can set specific column widths using `--width`, in this case the "column 2" width is set to 55 characters:

```sh
$ cat example/two-columns.json | table-layout --width "column 2: 55"
```

```
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

Full usage guide:

```
$ table-layout --help

table-layout

  Styleable plain-text table generator. Useful for formatting console output.

Synopsis

  $ cat jsonfile | table-layout [options]

Options

  -w, --width <widths>         specify a list of column widths in the format
                               '<column>:<width>', for example:
                               $ cat <json data> | table-layout --width "column 1:
                               10" "column 2: 30"
  -l, --padding-left string    One or more characters to pad the left of each
                               column. Defaults to ' '.
  -r, --padding-right string   One or more characters to pad the right of each
                               column. Defaults to ' '.
  -h, --help
```

* * *

&copy; 2015-19 Lloyd Brookes \<75pound@gmail.com\>.
