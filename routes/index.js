var express = require('express');
var router = express.Router();
var requests = require("../utils/requests")

var helper = require("../utils/helper");
var db = require("../db/db");
router.get('/products', function (req, res, next) {

  requests.getFeedListing().then((result) => {
    return requests.getMobiles(result);
  }).then((mobiles) => {
    res.send(mobiles)
  }).catch((error) => {
    res.send(error);
  });

});

module.exports = router;
