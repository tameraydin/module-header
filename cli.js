#!/usr/bin/env node
'use strict';
const meow = require('meow');
const header = require('./');

const cli = meow(`
  Usage:
    $ header <file-pattern-1[, file-pattern-n]> <[custom-template]>

  Example:
    $ header dist/*.js
`);

if (!cli.input.length) {
  console.error('No file pattern(s) provided');
  process.exit(1);
}

let pattern = cli.input[0];

header(pattern.split(',').length > 1 ?
  '{' + pattern + '}' : pattern, cli.pkg, cli.input[1] || null);
