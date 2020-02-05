lnpay-js
===========================

LNPay JavaScript SDK - at the moment a basic wrapper for the [LNPay API](https://docs.lnpay.co)

## Install

You can get it on npm.

```
npm install lnpay-js --save
```

Or if you're not into package management, just [download a ZIP](https://github.com/lnpay/lnpay-js/zipball/master) file.

## Setup

First, include the script located on the `dist` folder or load it from unpkg.

```html
<script src="https://unpkg.com/lnpay-js@0.1.0/dist/lnpay-js-0.1.0.min.js"></script>
```

Now, you need to instantiate it with a Public API Key from [LNPay.co](https://lnpay.co)

```js
let publicApiKey = '';
LNPay.Initialize(publicApiKey);
```

# Usage - [Documentation](https://docs.lnpay.co)

The first alpha version of this SDK is mainly a wrapper for the [LNPay API](https://docs.lnpay.co)

Everyhing revolves around the _wallet_ and Wallet Access Keys (WAK) which grant various levels of permission.

### Instantiate a Wallet / Check Balance

```js
let myWallet = new LNPayWallet(walletAccessKey);
myWallet.getInfo(function(result) {
      console.log('Balance:' + result.balance);
    }
);
```

### Create a wallet

You can create a _wallet_ from the UI or via the API. When you create a wallet via the API, Wallet Access Keys (WAK) are returned. You need to save these.

```js
let walletParams = {"user_label":"My wallet"};
LNPay.createWallet(walletParams,
    function(result) {
      console.log(result);
    }
);
```

### Generate Invoice

```js
let myWallet = new LNPayWallet(walletAccessKey);
let invoiceParams = {"num_satoshis":2,"memo":"Tester"};
myWallet.createInvoice(invoiceParams,
    function(result) {
      console.log(result);
    }
);
```

### Pay Invoice

```js
let myWallet = new LNPayWallet(walletAccessKey);
let invoiceParams = {"payment_request":"lnbc1111..."};
myWallet.payInvoice(invoiceParams,
    function(result) {
      console.log(result);
    }
);
```

### Transfers between wallets

```js
let myWallet = new LNPayWallet(walletAccessKey);
let transferParams = {"dest_wallet_id":"wa_xxxxx","num_satoshis":22,"memo":"Transfer Memo"};
myWallet.internalTransfer(transferParams,
    function(result) {
      console.log(result);
    }
);
```

### Get Wallet Transactions

```js
let myWallet = new LNPayWallet(walletAccessKey);
let queryParams = {};
myWallet.getTransactions(queryParams,
    function(result) {
      console.log(result);
    }
);
```

### Get LNURL

```js
let lnurlParams = {"num_satoshis":12,"memo":"SatsBack!"};
let myWallet = new LNPayWallet(walletAccessKey);
myWallet.getLnurl(lnurlParams,
    function(result) {
      console.log(result);
    }
);
```

### Get Invoice / Check if Settled
```js
let lntx_id = "lntx_Mxxxxx";
let lntx = new LNPayLnTx(lntx_id);
lntx.getInfo(function(result) {
  console.log("Is Settled" + result.settled);
}
);
```


See [this example file](example/example1.html)



Development
===========================

### 1. Installation

You will need to have [nodejs](http://nodejs.org/download) installed.

Clone the repository

### 2. Getting started

* open the command line and switch into the project folder
* ```npm install```
* ```npm install -g gulp```
* ```gulp``` to see the list of available tasks

### 3. Essential Gulp Tasks

* ```gulp build``` dumps a plain and a minified file from all files in the folder ```src``` into the folder ```dist```.
* ```gulp clean``` removes all files in the folder ```dist```.
* ```gulp test``` runs the tests and linting for all files in the folder ```src```.

### Credits and License

The structure for this SDK cloned from [here](https://github.com/monbro/javascript-sdk-boilerplate).

This software is published under the MIT-License. See 'license' for more information.
