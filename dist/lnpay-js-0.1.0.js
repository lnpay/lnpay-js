/*
*  LnTx API Functions
*
*  Learn more at https://docs.lnpay.co
*
*  @author Tim Kijewski (bootstrapbandit7@gmail.com)
*/

/**
 * SDK LnTx Helper Class
 */
function LNPayLnTx(accessKey) {
    this.accessKey = accessKey;

    this.getInfo = function(successCallback) {
        processGetRequest('lntx/' + this.accessKey,successCallback);
    };
}

/*
*  LNPay JS SDK
*
*  Learn more at https://github.com/lnpay/lnpay-js
*
*  @author Tim Kijewski (bootstrapbandit7@gmail.com)
*/

/**
 * The browser console
 *
 * @property console
 * @private
 * @type object
 */
window.console = window.console || {};
window.console.log = this.console.log || function() {};

/**
 * expose our sdk
 */
(function(root) {
  root.LNPay = root.LNPay || {};
  root.LNPay.VERSION = "js0.1.alpha";
}(this));

/**
 * main sdk
 */
(function(root) {

    root.LNPay = root.LNPay || {};

    /**
    * Contains all LNPay API classes and functions.
    * @name LNPay
    * @namespace
    *
    * Contains all LNPay API classes and functions.
    */
    var LNPay = root.LNPay;

    /**
     * Call this method first to set your authentication key.
     * @param {String} Public API Key
     * @param {Object} Params
     */
    LNPay.Initialize = function(publicApiKey, params) {
        LNPay._initialize(publicApiKey,params);
    };

    /**
     * Set default wallet access key
     * @param wak
     */
    LNPay.setDefaultWalletAccessKey = function(wak) {
        LNPay.defaultWalletAccessKey = wak;
    };

    /**
     * This method is for LNPay's own private use.
     * @param {String} Public API Key
     * @param {String} Default Wallet Access Key (WAK)
     * @param {Object} Params
     */
    LNPay._initialize = function(publicApiKey,defaultWak,params) {
        params = params || {};

        //Public API Key
        LNPay.publicApiKey = publicApiKey;

        //Wallet Access Key (WAK)
        LNPay.defaultWak = defaultWak;

        //API Endpoint
        LNPay.endpointUrl = params.endpointUrl || "https://lnpay.co/v1/";
    };

}(this));

/*
*  Utility helper functions
*
*  Learn more at https://github.com/lnpay/lnpay-js
*
*  @author Tim Kijewski (bootstrapbandit7@gmail.com)
*/

/**
 * Network helpers
 */
function processGetRequest(path,successCallback) {
    window.fetch(LNPay.endpointUrl + path, {
        "method" : "GET",
        "headers" : {
            "X-Api-Key" : LNPay.publicApiKey,
            "X-LNPay-sdk" : LNPay.VERSION
        }
    })
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            successCallback(response);
        })
        .catch(function(error) {
            console.log('GET Request failed', error)
        });
}
function processPostRequest(path,dataObject,successCallback) {
    window.fetch(LNPay.endpointUrl + path, {
        "method" : "POST",
        "body" : JSON.stringify(dataObject),
        "headers" : {
            "X-Api-Key" : LNPay.publicApiKey,
            "Content-Type" : "application/json",
            "X-LNPay-sdk" : LNPay.VERSION
        }
    })
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            successCallback(response);
        })
        .catch(function(error) {
            console.log('POST Request failed', error)
        });
}

/*
*  Wallet API Functions
*
*  Learn more at docs.lnpay.co
*
*  @author Tim Kijewski (bootstrapbandit7@gmail.com)
*/

/**
 * SDK Wallet Helper Class
 */
function LNPayWallet(accessKey) {
    if (accessKey) {
        this.accessKey = accessKey;
    } else if (!accessKey && LNPay.defaultWak)
        this.accessKey = LNPay.defaultWak;
    else {
        throw 'No wallet access key specified! Set a default, or initialize LNPayWallet with one';
    }


    /**
     * @see https://docs.lnpay.co/wallet/get-balance
     * @param successCallback
     */
    this.getInfo = function(successCallback) {
        processGetRequest('wallet/' + this.accessKey,successCallback);
    };

    /**
     * @see https://docs.lnpay.co/wallet/get-transactions
     * @param successCallback
     */
    this.getTransactions = function(params,successCallback) {
        processGetRequest('wallet/' + this.accessKey + '/transactions',successCallback);
    };

    /**
     * @see https://docs.lnpay.co/wallet/generate-invoice
     * @param params {"num_satoshis":1,"memo":"Test Memo"}
     * @param successCallback
     */
    this.createInvoice = function(params,successCallback) {
        processPostRequest('wallet/' + this.accessKey + '/invoice',params,successCallback);
    };

    /**
     * @see https://docs.lnpay.co/wallet/pay-invoice
     * @param params {"payment_request":"lnbc11111..."}
     * @param successCallback
     */
    this.payInvoice = function(params,successCallback) {
        processPostRequest('wallet/' + this.accessKey + '/withdraw',params,successCallback);
    };

    /**
     * @see https://docs.lnpay.co/wallet/transfers-between-wallets
     * @param params {"dest_wallet_id":"w_xxx","num_satoshis":1,...} note: wallet_id OR a wallet access key (WAK)
     * @param successCallback
     */
    this.internalTransfer = function(params,successCallback) {
        processPostRequest('wallet/' + this.accessKey + '/transfer',params,successCallback);
    };

    /**
     * @see https://docs.lnpay.co/wallet/lnurl-withdraw
     * @param params {"num_satoshis":2"}
     * @param successCallback
     */
    this.getLnurl = function(params,successCallback) {
        processGetRequest('wallet/' + this.accessKey + '/lnurl/withdraw?num_satoshis=' + params.num_satoshis,successCallback);
    };
}

(function(root) {
    root.LNPay = root.LNPay || {};
    var LNPay = root.LNPay;

    /**
     *
     * @param params {"user_label":"My Wallet"}
     * @param successCallback
     */
    LNPay.createWallet = function(params,successCallback) {
        processPostRequest('wallet',params,successCallback);
    };
}(this));
