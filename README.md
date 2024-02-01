# Lightcurve

## Quickstart

```
git clone https://github.com/ArpanManna/Lightcurve
```

# Usage

## Coding 1

```
cd coding1
```

* answer1.sol : It addresses the re-entrancy-eth attack, unchecked ownership transfer and missing events. \
* answer2.sol : Another posibility is written to avoid re-entrancy using non-reentrant modifier. We can also use openzeppelin Reentrancy Guard instead of non-reentrant modofier.


## Coding2 (part 1)

```
cd coding2
npm install
```
Setup environment variabltes (similar to .env.example)
```
PRIVATE_KEY=<PRIVATE_KEY>
PROVIDER_POLYGON_MUMBAI=<POLYGON_MUMBAI_RPC_URL>
BUNDLER_MUMBAI="https://bundler.biconomy.io/api/v2/80001/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44"
BUNDLER_ARBITRUM_SEPOLIA="https://bundler.biconomy.io/api/v2/421614/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44"
BUNDLER_OPTIMISM_GOERLI="https://bundler.biconomy.io/api/v2/420/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44"
BUNDLER_LINEA="https://bundler.biconomy.io/api/v2/59140/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44"
BUNDLER_BASE_GOERLI="https://bundler.biconomy.io/api/v2/84531/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44"
PAYMASTER_MUMBAI=<PAYMASTER_URL_MUMBAI>
PAYMASTER_ARBITRUM_SEPOLIA=<PAYMASTER_URL_ARBITRUM_SEPOLIA>
PAYMASTER_OPTIMISM_GOERLI=<PAYMASTER_URL_OPTIMISM_GOERLI>
PAYMASTER_LINEA=<PAYMASTER_URL_LINEA>
PYMASTER_BASE_GOERLI=<PAYMASTER_URL_BASE_GOERLI>
```
* Setup Paymaster for Polygon Mumbai, Arbitrum Sepolia, Optimism Goerli, Linea and Base Goerli testnet from https://dashboard.biconomy.io/ \
* Setup Gas Tank for all chains.
```
node deployMultichainAccount.js 
```

It will deploy the multichain smart Account with same counterfactual address for Polygon Mumbai, Arbitrum Sepolia testnet, Optimism Goerli, Linea and Base Goerli testnet.

## Coding2 (part 2)

Custom module is written in validationModule.sol file . It extends the BaseAuthorizationModule.sol and uses the interfaces IAuthorizationModule.sol and ISignatureValidator.sol

# Thank you!
