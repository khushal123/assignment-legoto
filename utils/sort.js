var helper = require("../utils/helper");
var db = require("../db/db");
var products = [];
db.getAllRecords().then(function (doc) {
    doc.forEach(element => {
        products.push(element)
        if (products.length == 100) {
            callBackAfterDB("done");
        }
    });
}).catch(function (error) {
    console.log(error)
})

function callBackAfterDB(done) {
    var merged = helper.mergeVariants(products);
   
    db.insertBulkSorted(merged).then(function (result) {
        console.log(result)
    }).catch(function (error) {
        console.log(error);
    })
}