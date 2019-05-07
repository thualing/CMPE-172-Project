const express = require('express');
const router  = express.Router();
var dbUtil = require("../dbConfig");

const jwt      = require('jsonwebtoken');
const passport = require('passport');


/* POST login. */
router.post('/login', function (req, res, next) {

    passport.authenticate('login', {session: false}, (err, user, info) => {
        console.log(err);
        res.setHeader("Access-Control-Allow-Origin", "*");
        if (err || !user) {
            return res.status(400).json({
                message: info ? info.message : 'Login failed',
                user   : user
            });
        }

        req.login(user, {session: false}, (err) => {
            if (err) {
                res.send(err);
            }

            const token = jwt.sign(user, 'your_jwt_secret');
            return res.json({user, token});
        });
    })
    (req, res);

});

router.post('/signup', function (req, res, next) {

    passport.authenticate('signup', {session: false}, (err, user, info) => {
        console.log(err);
        res.setHeader("Access-Control-Allow-Origin", "*");
        if(err || !user) {
            return res.status(400).json({
                message: info ? info.message : 'Signup failed',
                user   : user
            });
        }
        const token = jwt.sign(user, 'your_jwt_secret');
        return res.json({user, token});
    })
    (req, res);
});

module.exports = router;