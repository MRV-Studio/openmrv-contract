# Hardhat Celo Contract for Open MRV Data Anchor

- Please see project description in the openmrv-server [README](https://github.com/MRV-Studio/openmrv-server).

## Install Dependencies

```sh
yarn install
```

## Compile Typechain Artifacts

```sh
yarn compile
```

## Run Tests

```sh
yarn test
```

## Lint Typescript and Solidity Files

```sh
yarn lint
```

## Install Celo CLI

[Documentation on Celo CLI](https://docs.celo.org/cli/account)

```sh
npm install -g @celo/celocli
```

## Generate Celo Private Key for Alfajores testnet

### Create new account on Alfajores testnet and save details to .env file

Warning: *do not check in the .env file with your mnemonic or privateKey to a repository*

```sh
celocli config:set --node https://alfajores-forno.celo-testnet.org/
celocli account:new | sed -E 's/: (.+)/=\1/g' | grep '=' > .env
```

### Fund your Alfajores testnet account

copy your `address` from the .env file and visit:

<https://celo.org/developers/faucet>

Check your balance:

```sh
celocli account:balance <YOUR ADDRESS>
```

## Generate Celo Private Key for Celo mainnet

### Create new account on Celo mainnet and save details to .env file

Warning: *do not check in the .env file with your mnemonic or privateKey to a repository*

```sh
celocli config:set --node https://forno.celo.org
celocli account:new | sed -E 's/: (.+)/=\1/g' | grep '=' > .env
```

### Fund your Celo mainnet account

Purchase CELO on a [crypto exchange](https://celo.org/buy) or [bridge](https://docs.celo.org/protocol/bridge) tokens from another network.

Check your balance:

```sh
celocli account:balance <YOUR ADDRESS>
```
