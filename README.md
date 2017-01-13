
# Stellar Portal

> Stellar portal is a decentralized web app to access [Stellar network](https://www.stellar.org). It does not require any backend and only use [Horizon API](https://www.stellar.org/developers/reference).

## Overview

**Stellar Portal** is a *decentralized* web application to access the *Stellar Network*. Its goal is to provide people full control over account and make most of operations through it, without the need of a backend, by only using Horizon API.

### Features

Here is a list of currently working features.

- Viewing account balances
- Add/Remove a trustline
- Send a direct payment
- Send a path payment to either trusted/untrusted asset
- Issue asset
- List account offers
- Create/Delete offers
- Consult orderbooks, i.e existing bids/asks for a pair of assets
- List account payments and path payments sent/received
- Switch between test or public network

You can either enter a public key or a private seed, and either become in view mode only or in view and edit mode.

### TODO features

- Create account on testnet with friendbot
- Manage multiple accounts with labels and types (personal, issuer, market maker...)
- Dataviz with useful graphs about the market
- Propose to the user a list of recommanded anchors
- Show QR codes
- Add memo to operations

### Security

When you enter your keys in the app, nothing is sent to any server, it is only kept locally. We don't rely on any backend to store your keys. So the privacy of your data is left to the browser that you use.


* For development purposes, when you set your keys, they are put into the browser address bar, so your seed may be corrupted. For now, only use public keys on public network.*


It is planned to store accountIds and keys into the local storage for returning user, and so we will encrypt them with a password.

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
$ # Build
$ npm run build
$ # Host bundled app
$ npm run server
```

## Work to do

### Market visualisation

One of great features would be making trading as easy as possible, for example, visual trading (by clicking on the graph) would be amazing.

### Browser extension

As said above, Metamask from ethereum project is a good example of this kind of app.
It is a Chrome extension that holds multiple wallets and allow to make transactions on the network. Its particularity is that it injects `web3` into every tab so that any webapp can act with user's wallets.


Such extension would be useful if websites like exchanges, stores or remittance accept this protocol.

### Internationalization

Indeed the app would need to be available in several languages.

## Ideas

If you have any suggestions or ideas about anything above, feel free to share them !
