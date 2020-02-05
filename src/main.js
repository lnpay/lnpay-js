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
  root.LNPay.VERSION = "js0.1.0";
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
