import { config as dotEnvConfig } from "dotenv";

import { HardhatUserConfig, HttpNetworkHDAccountsConfig } from "hardhat/types";
import "@nomicfoundation/hardhat-chai-matchers";
import "@nomiclabs/hardhat-solhint";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "hardhat-deploy";
import "hardhat-deploy-ethers";
import "@nomiclabs/hardhat-ethers";
import "hardhat-celo";

// eslint-disable-next-line node/no-missing-import
import "./tasks/operations/accounts";
// eslint-disable-next-line node/no-missing-import
import "./tasks/operations/anchor";
dotEnvConfig();

const CELO_MNEMONIC = process.env.mnemonic;
// bip 44 format m / purpose' / coin_type' / account' / change / index
const CELO_DERIVATION_PATH = "m/44'/52752'/0'/0/";

const accounts: HttpNetworkHDAccountsConfig = {
  mnemonic:
    CELO_MNEMONIC ||
    "test test test test test test test test test test test junk",
  path: CELO_DERIVATION_PATH,
  initialIndex: 0,
  count: 10,
  passphrase: "",
};

// const CELO_PRIVATE_KEY = process.env.privateKey || "";
// const accounts = [CELO_PRIVATE_KEY];

const config: HardhatUserConfig = {
  solidity: {
    compilers: [{ version: "0.8.13", settings: {} }],
  },
  paths: {
    sources: "contracts",
  },
  namedAccounts: {
    deployer: 0,
    tokenOwner: 1,
  },
  networks: {
    hardhat: {
      initialBaseFeePerGas: 0, // to fix : https://github.com/sc-forks/solidity-coverage/issues/652, see https://github.com/sc-forks/solidity-coverage/issues/652#issuecomment-896330136
    },
    localhost: {
      url: "http://localhost:8545",
      accounts,
    },
    alfajores: {
      url: "https://alfajores-forno.celo-testnet.org",
      accounts,
      chainId: 44787,
    },
    celo: {
      url: "https://forno.celo.org",
      accounts,
      chainId: 42220,
    },
  },
  etherscan: {
    apiKey: {
      alfajores: process.env.celoscanapikey || "",
      celo: process.env.celoscanapikey || "",
    },
    customChains: [
      {
        network: "celo",
        chainId: 42220,
        urls: {
          apiURL: "https://api.celoscan.io/api",
          browserURL: "https://celoscan.io",
        },
      },
    ],
  },
  gasReporter: {
    enabled: !!process.env.REPORT_GAS,
    currency: "USD",
  },
  typechain: {
    outDir: "typechain",
    target: "ethers-v5",
  },
};

export default config;
