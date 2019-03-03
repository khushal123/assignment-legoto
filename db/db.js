var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/legoto", { useNewUrlParser: true });


var schema = require("./schema")
var OriginalModel = schema.OriginalModel;
var SortedModel = schema.SortedModel;


var insertBulkOriginal = function (OriginalProducts) {
    return new Promise(function (resolve, reject) {
        console.log(OriginalProducts);
        OriginalModel.collection.insertMany(OriginalProducts).then((result) => { resolve(result) }
        ).catch((error) => reject(error));
    })
}

var insertBulkSorted = function (sortedProducts) {
    return new Promise(function (resolve, reject) {
        SortedModel.create(sortedProducts).then((result) => { resolve(result) }
        ).catch((error) => reject(error));
    })
}

var getAllRecords = function () {
    return new Promise(function (resolve, reject) {

        OriginalModel.collection.find({}, { limit: 10000 }, function (err, doc) {
            if (err) {
                reject(err);
            } else {
                resolve(doc)
            }
        })
    });
}



module.exports.insertBulkOriginal = insertBulkOriginal;
module.exports.insertBulkSorted = insertBulkSorted;
module.exports.getAllRecords = getAllRecords;