var TrieSearch = require('trie-search');

var mergeVariants = function (productsArray) {
    var ts = new TrieSearch('title');
    var reducedArray = productsArray.map(product => product.productBaseInfoV1);
    ts.addAll(reducedArray);
    var newProductsArray = productsArray.map(function (product) {
        var brand = product.productBaseInfoV1.productBrand;
        var specificationList = product.categorySpecificInfoV1.specificationList;
        var values = specificationList[0].values.find(item => item.key === 'Model Name');
        var modelName = brand + " " + values.value
        return ts.get(modelName);
    });
    console.log(newProductsArray);
    return newProductsArray;
}






module.exports.mergeVariants = mergeVariants;

