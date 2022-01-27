# Ethereum React smart contracts

A look at web3 using the following tech:

- **Ethereum**
- **Hardhat** Ethereum development environment
- **React** Something familiar
- **Vite** Super fast js tooling
- **Chakra** Just to try it out

## Getting started

1. Install the dependencies

```sh
yarn
```

2. Start the local hardhat test node

```sh
npx hardhat node
```

4. Deploy the contract

```sh
npx hardhat run scripts/sample-script.js --network localhost
```

5. Update `src/App.js` with the values of (`greeterAddress` and `tokenAddress`)

6. Start the app

```sh
yarn dev
```
