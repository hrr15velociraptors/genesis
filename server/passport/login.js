// var LocalStrategy   = require('passport-local').Strategy;
// var User = require('./../db/models').User;
// var bCrypt = require('bcrypt-nodejs');
//
// module.exports = function(passport){
// 
// 	passport.use('login', new LocalStrategy({
//             passReqToCallback : true
//         },
//         function(req, username, password, done) {
//             // check in mongo if a user with username exists or not
//             User.findOne({ 'username' :  username },
//
//             );
//
//
//         })
//     );
// }
