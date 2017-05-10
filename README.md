# babel-plugin-fuck-optimization

Use this plugin when you want to see beautiful bailouts in your code.

Transforms this:

```js
function add(a, b) {
  return a + b;
}
```

into this:

```js
function add(a, b) {
  var __deoptimization = {
    __proto__: "notsofast"
  };
  
  return a + b;
}
```

It traverses all the `BlockStatement` and if its parent is `FunctionDeclaration` or `ClassMethod` 
~~it pushes the new `TryStatement` with `CatchClause` within the `BlockStatement`~~ (optimized in V8 5.3.1)
it adds an object literal declaration with modified `__proto__` property.

