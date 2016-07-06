module.exports = function (babel) {
  var t = babel.types;

  return {
    visitor: {
      BlockStatement: function (path) {
        if (
          t.isFunctionDeclaration(path.parentPath) ||
          t.isClassMethod(path.parentPath)
        ) {
          path.node.body.push(
            t.tryStatement(
              t.blockStatement([]),
              t.catchClause(t.identifier('e'), t.blockStatement([])),
              t.blockStatement([])
            )
          );
        }
      }
    }
  }
};
