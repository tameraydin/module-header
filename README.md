# module-header [![Build Status](http://img.shields.io/travis/tameraydin/module-header/master.svg?style=flat-square)](https://travis-ci.org/tameraydin/module-header)

A tool that generates an info header from your module's package.json and prepends it to the given file(s).

## Install

```
$ npm install --save-dev module-header
```

## Usage

```js
const header = require('module-header');
const pkg = require('./package.json')

header('dist/**/*.js', pkg)
// optionally pass your custom template string:
// header('*.js', pkg, `-- ${pkg.name} --`)
  .then(...)
  .catch(...);
```

## CLI

```
$ npm install --global module-header
```
```
  Usage:
    $ header <file-glob(s)>

  Example:
    $ header dist/**/* src/*.js
```

## License

MIT [http://tameraydin.mit-license.org/](http://tameraydin.mit-license.org/)