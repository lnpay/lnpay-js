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
