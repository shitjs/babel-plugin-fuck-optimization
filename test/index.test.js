var babel = require('babel-core');
var plugin = require('../src/index.js');

var INPUT_SOURCE = 'function testFunction(a, b) {return a + b;}';

console.log('Transforming: \n' + INPUT_SOURCE + '\n');
var out = babel.transform(INPUT_SOURCE, { plugins: [plugin] });
console.log('Transformed to: \n' + out.code + '\n');

out.code.replace('testFunction', 'deoptimizedTestFunction');

function testFunction(a, b) {
  return a + b;
}

function deoptimizedTestFunction(a, b) {
  var __deoptimization = {
    __proto__: "notsofast"
  };
  return a + b;
}

function printStatus(fn) {
  switch (%GetOptimizationStatus(fn)) {
    case 1:
      console.log("Function is optimized");
      break;
    case 2:
      console.log("Function is not optimized");
      break;
    case 3:
      console.log("Function is always optimized");
      break;
    case 4:
      console.log("Function is never optimized");
      break;
    case 6:
      console.log("Function is maybe deoptimized");
      break;
    case 7:
      console.log("Function is optimized by TurboFan");
      break;
    default:
      console.log("Unknown optimization status");
      break;
  }
}


//Fill type-info
testFunction(2, 2);

// 2 calls are needed to go from uninitialized -> pre-monomorphic -> monomorphic
testFunction(2, 2);

%OptimizeFunctionOnNextCall(testFunction);

//The next call
testFunction(2, 2);

//Check
printStatus(testFunction);


//Fill type-info
deoptimizedTestFunction(2, 2);

// 2 calls are needed to go from uninitialized -> pre-monomorphic -> monomorphic
deoptimizedTestFunction(2, 2);

%OptimizeFunctionOnNextCall(deoptimizedTestFunction);

//The next call
deoptimizedTestFunction(2, 2);

//Check
printStatus(deoptimizedTestFunction);
