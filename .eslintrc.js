module.exports = {
  extends: [
    "next/core-web-vitals",
    "next/typescript"
  ],
  ignorePatterns: [
    "src/generated/**/*",
    "prisma/**/*",
    "node_modules/**/*",
    "*.js"
  ],
  rules: {
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/no-require-imports": "warn",
    "@typescript-eslint/no-unused-expressions": "warn",
    "@typescript-eslint/no-this-alias": "warn",
    "react-hooks/exhaustive-deps": "warn",
    "react/no-unescaped-entities": "warn"
  },
  overrides: [
    {
      files: ["src/generated/**/*", "**/*.js"],
      rules: {
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/no-require-imports": "off",
        "@typescript-eslint/no-unused-expressions": "off",
        "@typescript-eslint/no-this-alias": "off"
      }
    }
  ]
};
