module.exports = {
    env: {
      browser: false,
      es2021: true,
      mocha: true,
      node: true,
    },
    plugins: ["@typescript-eslint"],
    extends: [
      "standard",
      "plugin:prettier/recommended",
      "plugin:node/recommended",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
      ecmaVersion: 12,
      project: [
        './tsconfig.json',
        './packages/*/tsconfig.json' // if you use monorepo
      ],
    },
    rules: {
      "node/no-unsupported-features/es-syntax": [
        "error",
        { ignores: ["modules"] },
      ],
      "node/no-unpublished-import": [
        "error",
        {
          allowModules: ["hardhat", "hardhat-deploy", "chai", "ethers", "hardhat-deploy-ethers",
          "dotenv", "@nomicfoundation/hardhat-chai-matchers", "@nomiclabs/hardhat-ethers", "@nomiclabs/hardhat-solhint",
          "@typechain/hardhat", "hardhat-celo", "hardhat-gas-reporter", "solidity-coverage"],
        },
      ],
      "node/no-missing-import": [
        "error",
        {
          allowModules: ["hardhat-deploy"],
          "resolvePaths": [__dirname],
        },
      ],
    },
  };