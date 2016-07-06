var babel = require('babel-core');
var plugin = require('../src/index.js');

var INPUT_SOURCE = 'function add(a, b) {return a + b;}';

console.log('Transforming: \n' + INPUT_SOURCE + '\n');
var out = babel.transform(INPUT_SOURCE, {plugins: [plugin]});
console.log('Transformed to: \n' + out.code + '\n');
