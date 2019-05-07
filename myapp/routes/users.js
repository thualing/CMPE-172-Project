var express = require('express');
var router = express.Router();
var dbUtil = require("../dbConfig");

var db = new dbUtil();


/* GET users listing. */
router.get('/', function(req, res, next) {
  db.fetchData("select * from departments limit 2", function(data) {
      // res.setHeader("Access-Control-Allow-Origin", "*");
      res.send(data);
  });
});

module.exports = router;


