'use strict';
const glob = require('glob');
const through2 = require('through2');
const fs = require('fs');

module.exports = (pattern, pkg, customTemplate) => {
  glob(pattern, (err, files) => {
    if (err) {
      console.error('Glob failure: ', err);
      process.exit(1);
    }

    files.forEach(fileName => {
      fs.createReadStream(fileName)
        .pipe(through2.obj(function(file, enc, cb) {
          this.push(
typeof customTemplate === 'string' ? customTemplate :
`/**
 * ${pkg.name} v${pkg.version} ${pkg.homepage ? '(' + pkg.homepage + ')' : ''}
 * Copyright ${(new Date()).getFullYear()} ${pkg.author.name || ''} ${pkg.author.url ? '(' + pkg.author.url + ')' : ''}
${pkg.license ? ' * Licensed under ' + pkg.license + `\n */` : ` */`}
`
            + file);
          cb();
        }))
        .pipe(fs.createWriteStream(fileName));
    });
  });
};