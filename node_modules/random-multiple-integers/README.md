# random-multiple-integers

[![Build Status](https://travis-ci.org/wafuwafu13/random-multiple-integers.svg?branch=master)](https://travis-ci.org/wafuwafu13/random-multiple-integers)

This is a program for generating an array containing multiple integers with a specified range

## Use examples

First, install this module in your project.
```
$ npm install random-multiple-integers
```
Import this module in your source code and call like below.

```javascript
let RandomInteger = require('random-multiple-integers')
let ri = new RandomInteger()

// ri.create(min, max, count)
console.log(ri.create(1, 10, 10));  // -> [9, 4, 2, 6, 6, 2, 5, 1, 8, 10]
console.log(ri.create(-10, 0, 10)); // -> [-6, 0, -5, -2, -6, -4, -8, -3, -10, -9]
console.log(ri.create(1, 1, 1));    // -> [1]
```

# Testing

random-multiple-integers uses jest for testing. You can run test cases by installing dependencies then run "npm test" command.
```
$ npm install
$ npm test
```

# License

This software is released under the MIT License, see LICENSE.txt.
