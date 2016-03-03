'use strict';
const map = require('map-stream');
const vfs = require('vinyl-fs');

const errHandler = function(err) {
  console.error(err);
  process.exit(1);
};

module.exports = (globs, pkg, customTemplate) => {
  vfs.src(globs)
    .on('error', errHandler)
    .pipe(map((file, cb) => {
      file.contents = new Buffer((typeof customTemplate === 'string' ? customTemplate :
`/**
 * ${pkg.name} v${pkg.version} ${pkg.homepage ? '(' + pkg.homepage + ')' : ''}
 * Copyright ${(new Date()).getFullYear()} ${pkg.author && pkg.author.name || ''} ${pkg.author && pkg.author.url ? '(' + pkg.author.url + ')' : ''}
${pkg.license ? ' * Licensed under ' + pkg.license + `\n */` : ` */`}
`) + file.contents);
      cb(null, file);
    }))
    .on('error', errHandler)
    .pipe(vfs.dest('./'))
    .on('error', errHandler);
};