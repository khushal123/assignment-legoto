var requests = require("../utils/requests");
// var helper = require("../utils/helper");
var db = require("../db/db");

var finalProducts = [];
requests.getFeedListing().then((result) => {
    console.log("GOT FEED RESULT")
    return requests.getMobiles(result);
}).then((mobiles) => {
    if (mobiles.hasOwnProperty("products")) {
        db.insertBulkOriginal(mobiles.products).then(function (result) {
            // console.log(result);
        }).catch(function (error) {
            console.log(error);
        });
        if (mobiles.hasOwnProperty("nextUrl") && mobiles.nextUrl) {
            requests.callRecursive(mobiles.nextUrl, function (finalProductsToInsert) {
                console.log("done")
            });
        }
    }

}).catch((error) => {
    console.log(error)
});