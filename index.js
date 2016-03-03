'use strict';
const map = require('map-stream');
const vfs = require('vinyl-fs');
const Promise = require('pinkie-promise');

module.exports = (globs, pkg, customTemplate) => {
  return new Promise((resolve, reject) => {
    vfs.src(globs)
      .on('error', (err) => reject(err))
      .pipe(map((file, cb) => {
        file.contents = new Buffer((typeof customTemplate === 'string' ? customTemplate :
`/**
 * ${pkg.name} v${pkg.version} ${pkg.homepage ? '(' + pkg.homepage + ')' : ''}
 * Copyright ${(new Date()).getFullYear()} ${pkg.author && pkg.author.name || ''} ${pkg.author && pkg.author.url ? '(' + pkg.author.url + ')' : ''}
${pkg.license ? ' * Licensed under ' + pkg.license + `\n */` : ` */`}
`) + file.contents);
        cb(null, file);
      }))
      .on('error', (err) => reject(err))
      .pipe(vfs.dest('./'))
      .on('error', (err) => reject(err))
      .on('end', resolve);
  });
};