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

## Generate CELO Private Key

### CELO CLI

```sh
npm install -g @celo/celocli
```

### Create new account and save details to .env file

Warning: *do not check in the .env file with your mnemonic or privateKey to a repository*

```sh
celocli config:set --node https://alfajores-forno.celo-testnet.org/
celocli account:new | sed -E 's/: (.+)/="\1"/g' | grep '=' > .env
```

### Fund your account

copy your address and visit:

<https://celo.org/developers/faucet>

### Check your balance

```sh
celocli account:balance <YOUR ADDRESS>
```
