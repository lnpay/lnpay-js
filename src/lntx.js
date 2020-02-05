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
