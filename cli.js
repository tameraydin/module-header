#!/usr/bin/env node
'use strict';
const meow = require('meow');
const mh = require('./');

const cli = meow(`
  Usage:
    $ mh <file pattern 1> <file pattern 2> ...

  Example:
    $ mh dist/*.js
`);

if (!cli.input.length) {
  console.error('No file pattern(s) provided');
  process.exit(1);
}

mh(cli.input.length > 1 ?
  '{' + cli.input.join(',') + '}' : cli.input[0], cli.pkg);
