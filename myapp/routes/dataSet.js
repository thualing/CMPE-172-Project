var express = require('express');
var router = express.Router();
var dbUtil = require("../dbConfig");
var passport = require("passport");

var db = new dbUtil();
var empNo = 10001;

router.get('/', function(req, res, next) {
    passport.authenticate('jwt', {session: false}, (err, user, info) => {
        console.log(err);
        res.setHeader("Access-Control-Allow-Origin", "*");
        if(err || !user) {
            return res.status(400).json({
                message: info ? info.message : 'Invalid token',
                user   : user
            });
        }
        if (user.permit === 'employee') {
            db.fetchData("select * from employees where emp_no = 10001", function(data) {
                res.send(data);
            });
        }
        else if (user.permit === 'manager'){
            db.fetchData("select * from employees limit 100", function(data) {
                res.send(data);
            });
        }
        else {
            db.fetchData("select * from employees limit 10", function(data) {
                res.send(data);
            });
        }

        // return res.json({user, token});
    })
    (req, res);

});
module.exports = router;


// | current_dept_emp     |
// | departments          |
// | dept_emp             |
// | dept_emp_latest_date |
// | dept_manager         |
// | employees            |
// | salaries             |
// | titles               |
// | users