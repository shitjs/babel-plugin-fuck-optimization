var deoptimizationVariableName = '__deoptimization'

module.exports = function (babel) {
  var t = babel.types;

  var isDeoptimizablePath = function (path) {
    if (t.isFunctionDeclaration(path.parentPath)) {
      return true;
    }

    if (t.isClassMethod(path.parentPath)) {
      return true;
    }

    if (t.isFunctionExpression(path.parentPath)) {
      return true;
    }

    if (t.isArrowFunctionExpression(path.parentPath)) {
      return true;
    }

    return false;
  };

  return {
    visitor: {
      BlockStatement: function (path) {
        if (!isDeoptimizablePath(path)) {
          return;
        }

        var deoptimizationVariableDeclaration = t.variableDeclaration('var', [
          t.variableDeclarator(
            t.identifier(deoptimizationVariableName),
            t.objectExpression([
              t.objectProperty(t.Identifier('__proto__'), t.stringLiteral('notsofast'))
            ])
          )
        ]);

        path.node.body.unshift(deoptimizationVariableDeclaration);
      }
    }
  }
};
