
# Stellar Portal

> Stellar portal is a decentralized web app to access [Stellar Network](https://www.stellar.org). It does not require any backend and only use [Horizon API](https://www.stellar.org/developers/reference).

## Overview

**Stellar Portal** is a *decentralized* web application to access the *Stellar Network*. Its goal is to provide people full control over account and make most of operations through it, without the need of a backend, by only using Horizon API.

### Example account

You can try the app on an example account at this address:
https://stellar-portal.ngfar.io/?secretSeed=SD7U7XW6F53RKVDJOPPJWHLGY2K4WMLOIAE5A6LP7IYCJOCVB2HYEBEY&network=test

### Features

Here is a list of currently working features.

- Viewing account balances
- Add/Remove a trustline
- Send a direct or path payment
- Issue asset
- Create/Merge account
- List and edit account offers
- Consult orderbooks, i.e existing bids/asks for a pair of assets
- List account payments and path payments sent/received
- Switch between test or public network
- Create account on testnet

You can either enter a public key or a private seed, and either enter in view or edit mode.

### Screenshot
![Main view screenshot](https://github.com/pakokrew/stellar-portal/raw/master/content/assets/images/screen1.jpg)
### TODO features

- Electron desktop app
- Manage multiple accounts with labels and types (personal, issuer, market maker...)
- Send to federation addresses
- Propose to the user a list of recommanded anchors
- Allow to buy and watch orderbook of trade for untrusted assets
- Expand views and order/limit tables (offers, payments)
- Show QR codes
- Add memo to operations
- Dataviz with useful graphs about the market
- All the other Horizon stuff not implemented ;)

### Security

When you enter your keys in the app, nothing is sent to any server, it is only kept locally. We don't rely on any backend to store your keys. So the privacy of your data is left to the browser that you use.

It is planned to store accountIds and keys into the local storage for returning user, that will be encrypted them with a password.

### Bugs and ideas

If you see any bug or have any idea about things to add or change, feel free to contact me or post an issue.

## Development

### Librairies used

- React + Redux
- Stellar JS SDK
- Semantic-UI

### Dependencies

- Node.js >= v6.1
- NPM >= v3.1

### Installation

```bash
$ npm install
```

### Running

```bash
$ # Development
$ npm run dev
$ # Build into ./build
$ npm run build
```

## Work to do

### Full stellar implementation

There are some important Stellar that are not implemented in this application, and the goal is to cover everything what we can do with Horizon.

### Market visualisation

One of great features would be making trading as easy as possible, for example, visual trading (by clicking on the graph) would be amazing.
This feature will need an extra backend. Account data will still be stored in browser, backend would only be for public data aggregation.

### Browser extension

As said above, Metamask from ethereum project is a good example of this kind of app.
It is a Chrome extension that holds multiple wallets and allow to make transactions on the network. Its particularity is that it injects `web3` into every tab so that any webapp can act with user's wallets.


Such extension would be useful if websites like exchanges, stores or remittance accept this protocol.

### Internationalization

Indeed the app would need to be available in several languages.

## Ideas

If you have any suggestions or ideas about anything above, feel free to share them !
