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
  return a + b;
  try {} catch(e) {} finally {}
}
```

It traverses all the `BlockStatement` and if its parent is `FunctionDeclaration`
it pushes the new `TryStatement` with `CatchClause` within the `BlockStatement`.
