module.exports = {
   env: {
      browser: true,
      es6: true,
   },
   extends: [
      "eslint:recommended",
      "plugin:import/errors",
      "plugin:import/warnings",
      "plugin:@typescript-eslint/recommended",
   ],
   parser: "@typescript-eslint/parser",
   parserOptions: {
      project: "tsconfig.eslint.json",
      sourceType: "module",
   },
   plugins: ["@typescript-eslint"],
   rules: {
      // Force function overloads to be declared together. This ensures readers understand APIs.
      "@typescript-eslint/adjacent-overload-signatures": "error",

      // Warn when an empty interface is defined. These are generally not useful.
      "@typescript-eslint/no-empty-interface": "warn",

      // Functions must either be handled directly (e.g. with a catch() handler) or returned to another function.
      // This is a major source of errors in Cloud Functions and the team strongly recommends leaving this rule on.
      "@typescript-eslint/no-floating-promises": "error",

      // Do not allow internal modules or namespaces . These are deprecated in favor of ES6 modules.
      "@typescript-eslint/no-namespace": "error",

      // Do not allow type assertions that do nothing. This is a big warning that the developer may not understand the
      // code currently being edited (they may be incorrectly handling a different type case that does not exist).
      "@typescript-eslint/no-unnecessary-type-assertion": "error",

      // Replaces regular eslint no-unused-vars without false positive for interfaces
      "@typescript-eslint/no-unused-vars": ["error"],

      // prefer for( ... of ... ) to an index loop when the index is only used to fetch an object from an array.
      // (Even better: check out utils like .map if transforming an array!)
      "@typescript-eslint/prefer-for-of": "warn",

      // Ban triple slash reference directives.
      "@typescript-eslint/triple-slash-reference": "error",

      // Warns if function overloads could be unified into a single function with optional or rest parameters.
      "@typescript-eslint/unified-signatures": "warn",

      // Prefer === and !== over == and !=. The latter operators support overloads that are often accidental.
      eqeqeq: ["warn", "smart"],

      // Warn when using deprecated APIs.
      "import/no-deprecated": "warn",

      // Don't allow empty function blocks.
      "no-empty-function": "error",

      // Do not allow any imports for modules that are not in package.json. These will almost certainly fail when deployed.
      "import/no-extraneous-dependencies": "error",

      "import/no-unassigned-import": "warn",

      // Disallow duplicate imports in the same file.
      "no-duplicate-imports": "error",

      // The 'this' keyword can only be used inside of classes.
      "no-invalid-this": "error",

      // Do not allow primitive wrapper instances.
      "no-new-wrappers": "error",

      // Do not allow parameters to be reassigned. To avoid bugs, developers should instead assign new values to new vars.
      "no-param-reassign": "error",

      // Do not allow comma operator.
      "no-sequences": "error",

      // Do not allow strings to be thrown because they will not include stack traces. Throw Errors instead.
      "no-throw-literal": "error",

      // This rules reports TS interfaces as unused vars, must be disabled.
      "no-unused-vars": "off",

      //Warn when variables are defined with var. Var has subtle meaning that can lead to bugs. Strongly prefer const for
      // most values and let for values that will change.
      "no-var": "error",

      // Expressions must always return a value. Avoids common errors like const myValue = functionReturningVoid();
      "no-void": "error",

      // Prefer const for values that will not change. This better documents code.
      "prefer-const": "warn",
   },
};
