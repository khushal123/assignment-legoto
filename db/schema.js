var mongoose = require("mongoose");


var Schema = mongoose.Schema;
var originalProducts = new Schema({ any: Schema.Types.Mixed }, { collection: 'originalproducts' });

var sortedProducts = new Schema({}, { strict: false, collection: 'sortedproducts' });

module.exports.OriginalModel = mongoose.model("OriginalProducts", originalProducts, "originalproducts");
module.exports.SortedModel = mongoose.model("SortedProducts", sortedProducts);