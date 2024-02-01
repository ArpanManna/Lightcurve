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

### Deployed contract address
```
0xED0Bcf64F297427DEaDc7dA7CFa5b7A9D899dDeC
```
### Contract Deployment Tranactions
```
Polygon Mumbai Transaction: https://mumbai.polygonscan.com/address/0xED0Bcf64F297427DEaDc7dA7CFa5b7A9D899dDeC#internaltx
Arbitrum Sepolia Transaction: https://sepolia.arbiscan.io/address/0xED0Bcf64F297427DEaDc7dA7CFa5b7A9D899dDeC#internaltx
Optimism Goerli Transaction: https://goerli-optimism.etherscan.io/address/0xED0Bcf64F297427DEaDc7dA7CFa5b7A9D899dDeC#internaltx
Linea Goerli Transaction: https://explorer.goerli.linea.build/address/0xED0Bcf64F297427DEaDc7dA7CFa5b7A9D899dDeC/internal-transactions#address-tabs
Base Goerli Transaction: https://goerli.basescan.org/address/0xED0Bcf64F297427DEaDc7dA7CFa5b7A9D899dDeC#internaltx
### NFT mint transaction Hasees
```
Polygon Mumbai Transaction: https://mumbai.polygonscan.com/tx/0x83a2e1c8f094e6c42eb037c7560f66639a1ed98e6c634f1e6655c8386048b1e6
Arbitrum Sepolia Transaction: https://sepolia.arbiscan.io/tx/0x4d5b8eba242e8a7d11d496e880a8d86a1fb252f0358963205dfa1e57072b4bc3
Optimism Goerli Transaction: https://goerli-optimism.etherscan.io/tx/0xe166f4f00ffa050bfd1ddbca2c368df3c7b917d1091cfb37b98307220ca4564e
Linea Goerli Transaction: https://explorer.goerli.linea.build/tx/0xd59b1496abcff9157ad76d30b766e2c181821c1f7a7d472756bcbea35ccb9600
Base Goerli Transaction: https://goerli.basescan.org/tx/0x1a7f5caa094b9ea46b65ccfb09c61fc465ca0bc580d65813969647fefeabb8f8
```

## Coding2 (part 2)

Custom module is written in validationModule.sol file . It extends the BaseAuthorizationModule.sol and uses the interfaces IAuthorizationModule.sol and ISignatureValidator.sol

# Thank you!
