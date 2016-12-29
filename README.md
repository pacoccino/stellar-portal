
# Stellar Portal

> This is a draft for a decentralized web app for Stellar.
It describes what the app should do. Some mock-ups showing these features would be welcomed.

## Overview

## Dependencies

- Node.js >= v6.1
- NPM >= v3.1

## Installation

```bash
$ npm install
```

## Running

```bash
$ # Development
$ npm run dev
$ # Build
$ npm run bundle
$ # Host bundled
$ npm run bundle-server
```

## Description

**Stellar Portal** is a *decentralized* web application to access the *Stellar Network*. Its goal is to provide people full control over their account and do most of transaction, without the need of a backend, by only using Horizon API.

### Name
Stellar portal is a temporary name, waiting for a better one.

### Features

The goal is to achieve the maximum of Stellar features into the app.

- Create account
- View balances
- Manage multiple accounts with labels and types (personal, issuer, market maker...)
- Send a payment in native or custom asset
- Ask for a path payment
- Create asset
- Become an anchor/issuer
- Trust an anchor
- Make offers
- See offers for pairs
- Trade assets
- Market dataviz

### Guest

A guest user (without account) could still use any publicly available, like seeing account balances or effects, see a list of anchors, see offers/orderbooks for particular asset pair.

### Security

As the main goal is to not use any backend, users will have either to create an account in the app, or provide their secret seed which will only be stored in the browser. 


For returning users, it could be useful to store the account data into the local storage, so that the user doesn't have to re-enter their seed at every page reload. In order to do this, the seed(s) may be encrypted with a passphrase. Metamask (ethereum) is a good example of this.


A security audit would be useful to know if any unencrypted data within a session/tab can be retrieved from the outside. 

### Decentralization

Decentralization means no backend, except Stellar's Horizon (which is sort of a backend). If many users use the app, a particular Horizon server would be necessary, as suggested by SDF, for high availability and sharing nodes.

However, some features that we want to put it are not available in Horizon API, such as a list of preset anchors, creating provisioned account, or more detailed data only available in stellar core. We then may need a backend to serve these informations, until they are available in Horizon.


The main goal is to implement most of the features server-less, but somes may need a backend.

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
