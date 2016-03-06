#!/usr/bin/env node
'use strict';
const meow = require('meow');
const header = require('./');

const cli = meow(`
  Usage:
    $ header <file-glob(s)>

  Example:
    $ header dist/**/* src/*.js
`);

if (!cli.input.length) {
  console.error('No file glob provided');
  process.exit(1);
}

header(cli.input)
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
