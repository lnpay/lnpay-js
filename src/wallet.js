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
