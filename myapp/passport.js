const passport    = require('passport');
const passportJWT = require("passport-jwt");
var dbUtil = require("./dbConfig");

const ExtractJWT = passportJWT.ExtractJwt;

const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy   = passportJWT.Strategy;

passport.use('login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
    },
    function (email, password, cb) {
        var db = new dbUtil();
        return db.fetchData('select * from users where email = "' + email + '" and password = "' + password + '"', function(data) {
            if (data.length === 0) {
                return cb(null, false, {message: 'Incorrect email or password.'})
            }
            db.fetchData('select permit from users where email = "' + email + '"', function (data) {
                return cb(null, {email: email, permit: data[0].permit}, {
                    message: 'Logged In Successfully'
                });
            })
        });

    }
));

passport.use('signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function (email, password, cb) {
        var db = new dbUtil();
        return db.fetchData('select * from users where email = "' + email + '"', function (data) {
            if (data.length !== 0) {
                return cb(null, false, {message: 'User already exist'})
            }
            db.fetchData('insert into users (email, password) values ("' + email + '", "' + password + '")', function (data) {
                var permit = 'employee';
                return cb(null, {email: email, permit: permit}, {
                    message: 'Signed Up Successfully'
                });
            })
        })

    }
));

passport.use("jwt", new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey   : 'your_jwt_secret'
    },
    function (jwtPayload, cb) {
        console.log(jwtPayload);
        if (!jwtPayload) {
            return cb("invalid/missing token", null, {message: "invalid/missing token"});
        }
        var db = new dbUtil();
        return db.fetchData('select * from users where email = "' + jwtPayload.email + '"', function (data) {
            return cb(null, {email: jwtPayload.email, permit: jwtPayload.permit}, {
                message: 'token verified'
            });
        })
    }
));