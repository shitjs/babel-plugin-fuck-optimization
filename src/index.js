module.exports = function (babel) {
  var t = babel.types;

  var isDeoptimizablePath = function (path) {
    return t.isFunctionDeclaration(path.parentPath) || t.isClassMethod(path.parentPath)
  };

  return {
    visitor: {
      BlockStatement: function (path) {
        if (!isDeoptimizablePath(path)) {
          return;
        }

        var oldBody = path.node.body.slice(0);

        path.node.body.length = 0;

        var tryCatchStatement = t.tryStatement(
          t.blockStatement([]),
          t.catchClause(t.identifier('e'), t.blockStatement([])),
          t.blockStatement([])
        );

        path.node.body.push(tryCatchStatement);

        var deoptimizationVariableDeclaration = t.variableDeclaration('var', [
          t.variableDeclarator(
            t.identifier('deoptimization'),
            t.objectExpression([
              t.objectProperty(t.Identifier('__proto__'), t.stringLiteral('notsofast'))
            ])
          )
        ]);

        path.node.body.push(deoptimizationVariableDeclaration);

        var withStatement = t.withStatement(
          t.identifier('deoptimization'),
          t.blockStatement(oldBody)
        );

        path.node.body.push(withStatement);
      }
    }
  }
};
