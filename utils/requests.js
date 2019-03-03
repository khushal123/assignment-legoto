let unirest = require("unirest");
let FkAffId = 'arun92phoenix',
    FkAffToken = '0b5647b2f5da4182b3d2314f384c16fe',
    responseType = 'json';

var headers = {
    'Fk-Affiliate-Id': FkAffId,
    'Fk-Affiliate-Token': FkAffToken
};

let feedListingUrl = "https://affiliate-api.flipkart.net/affiliate/api/" + FkAffId + ".json";


let requests = {};
let db = require('../db/db')

requests.getFeedListing = function () {
    return new Promise(function (resolve, reject) {
        var request = unirest.get(feedListingUrl);
        request.headers(headers).end(function (response) {
            if (response.statusCode == 200) {
                var body = response.body;
                let apiListings = body.apiGroups.affiliate.apiListings;
                let mobiles = apiListings.mobiles
                resolve(mobiles);
            } else {
                reject({
                    status: response.statusCode,
                    message: response.body,
                    stack: "requests.getFeedListing.27"
                });
            }
        });
    });
}

requests.getMobiles = function (mobilesFeed) {
    return new Promise(function (resolve, reject) {
        var availableVariants = mobilesFeed.availableVariants;
        var versions = Object.keys(availableVariants);
        var request = unirest.get(availableVariants[versions[0]].get);
        request.headers(headers).end(function (response) {
            if (response.statusCode == 200) {
                var body = response.body;
                resolve(body);
            } else {
                reject({
                    status: response.statusCode,
                    message: response.body,
                    stack: "requests.getMobiles.48"
                })
            }
        });
    });
}



requests.callRecursive = function (nextUrl, callback) {
    var count = 1;
    function go(nextUrl) {
        if (nextUrl) {
            console.log(nextUrl)
            var request = unirest.get(nextUrl);
            request.headers(headers).end(function (response) {
                if (response.statusCode == 200) {
                    var body = response.body;
                    if (body.hasOwnProperty("products")) {
                        db.insertBulkOriginal(body.products).then(function (result) {
                            // console.log(result);
                        }).catch(function (error) {
                            console.log(error);
                        });
                        if (body.hasOwnProperty("nextUrl") && body.nextUrl) {
                            go(nextUrl);
                        } else {
                            callback(finalProducts);
                        }
                    }
                } else {
                    callback(false)
                }
            });
        } else {
            callback(false);
        }
    }
    go(nextUrl)
}



module.exports = requests;