'use strict';
const fs = require('fs');
const map = require('map-stream');
const vfs = require('vinyl-fs');
const pkgUp = require('pkg-up');
const Promise = require('pinkie-promise');

const write = function(file, pkg, customTemplate, cb) {
  file.contents = new Buffer((typeof customTemplate === 'string' ? customTemplate :
`/*!
 * @license
 * ${pkg.name} v${pkg.version} ${pkg.homepage ? '(' + pkg.homepage + ')' : ''}
 * Copyright ${(new Date()).getFullYear()} ${pkg.author ? (typeof pkg.author === 'string' ? pkg.author : (pkg.author.name || '')) : ''}${pkg.author && pkg.author.url ? ' (' + pkg.author.url + ')' : ''}
${pkg.license ? ' * Licensed under ' + pkg.license + `\n */` : ` */`}
`) + file.contents);
  cb(null, file);
};

module.exports = (globs, pkg, customTemplate) => {
  return new Promise((resolve, reject) => {
    vfs.src(globs, {base: './'})
      .on('error', (err) => reject(err))
      .pipe(map((file, cb) => {
        if (pkg) {
          write(file, pkg, customTemplate, cb);
          return;
        }

        pkgUp(file.path)
          .then(pkgPath => {
            fs.readFile(pkgPath, (err, obj) => {
              if (err) {
                reject(err);
                return;
              }

              try {
                pkg = JSON.parse(obj);

              } catch(e) {
                reject(e);
                return;
              }

              write(file, pkg, customTemplate, cb);
            });
          })
          .catch(reject);
      }))
      .on('error', (err) => reject(err))
      .pipe(vfs.dest('./'))
      .on('error', (err) => reject(err))
      .on('end', resolve);
  });
};
