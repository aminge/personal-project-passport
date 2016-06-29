/*
CREATE TABLE users (
 id SERIAL PRIMARY KEY,
 username VARCHAR(100) NOT NULL UNIQUE,
 password VARCHAR(120) NOT NULL
);
*/

var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var encryptLib = require('../modules/encryption');
var connection = require('../modules/connection');
var pg = require('pg');


var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
//TODO SQL query
  console.log('called deserializeUser');
  pg.connect(connection, function (err, client) {

    var user = {};
    console.log('called deserializeUser - pg');
      var query = client.query("SELECT * FROM users WHERE id = $1", [id]);

      query.on('row', function (row) {
        console.log('User row', row);
        user = row;
        done(null, user);
      });

      // After all data is returned, close connection and return results
      query.on('end', function () {
          client.end();
      });

      // Handle Errors
      if (err) {
          console.log(err);
      }
  });
});

// Does actual work of logging in
passport.use(new GoogleStrategy({

        clientID        : configAuth.googleAuth.clientID,
        clientSecret    : configAuth.googleAuth.clientSecret,
        callbackURL     : configAuth.googleAuth.callbackURL,
        passReqToCallback : true
        // allows us to pass in the req from our route (lets us check if a user is logged in or not)

    },
    function(req, token, refreshToken, profile, done) {
        // asynchronous
        process.nextTick(function() {
            // check if the user is already logged in
            if (!req.user) {

                pg.connect(connectionString, function(err, client, done) {
                    var user = {};
                    //var query = client.query('UPDATE users SET ****** WHERE google_id = $1',
                    var query = client.query('SELECT * FROM users WHERE google_id = $1',
                        [profile.id]); // user.token, user.name, user.email
                    query.on('row', function(row) {
                        user = row;
                    });

                    // After all data is returned, close connection and return results
                    query.on('end', function () {
                        client.end();
                    });

                    // Handle Errors
                    if (err) {
                        console.log(err);
                        done(err, null);
                    }

                    if (user !== {}) {
                        // I think a lot of stuff goes here

                        // if there is a user id already but no token (user was linked at one point and then removed)
                        if (!user.token) {
                            console.log('token thing');
                            user.token = token;
                            user.name  = profile.displayName;
                            user.email = (profile.emails[0].value || '').toLowerCase(); // pull the first email

                            // ############# This section updates user with above information instead of user.save

                            pg.connect(connectionString, function(err, client, done) {
                                client.query('UPDATE users SET token = $1, name = $2, email = $3 WHERE google_id = $4',
                                    [user.token, user.name, user.email, profile.id],
                                    function (err, result) {
                                        if(err) {
                                            done();
                                            console.log("Error updating user: ", err);
                                            res.send(false);
                                        } else {
                                            done();
                                            res.send(result);
                                        }
                                    }
                                );
                            });
                        }

                        //return done(null, user);
                    } else {
                        console.log('new user created');

                        // This section needs to insert a new user into the users table
                        var newUser = {};

                        newUser.google_id = profile.id;
                        newUser.token = token;
                        newUser.name  = profile.displayName;
                        newUser.email = (profile.emails[0].value || '').toLowerCase(); // pull the first email

                        pg.connect('connectionString', function(err, client, done) {
                            client.query('INSERT INTO users (google_id, token, name, email), VALUES ($1, $2, $3, $4)',
                                [newUser.google_id, newUser.token, newUser.name, newUser.email],
                                function (err, result) {
                                    if(err) {
                                        done();
                                        console.log("Error inserting new user: ", err);
                                        res.send(false);
                                    } else {
                                        done();
                                        res.send(result);
                                    }
                                }
                            );
                        });
                    }

                });
                // find user in the database by google_id
                // will have to save google ids in the database


            } else {
                // user already exists and is logged in, we have to link accounts
                console.log('link thing');
                var user = req.user; // pull the user out of the session

                user.google_id = profile.id;
                user.token = token;
                user.name  = profile.displayName;
                user.email = (profile.emails[0].value || '').toLowerCase(); // pull the first email

                // This section updates user in table with the data above

                pg.connect(connectionString, function(err, client, done) {
                    client.query('UPDATE users SET token = $1, name = $2, email = $3 WHERE google_id = $4',
                        [user.token, user.name, user.email, user.google_id],
                        function (err, result) {
                            if(err) {
                                done();
                                console.log("Error updating user: ", err);
                                res.send(false);
                            } else {
                                done();
                                res.send(result);
                            }
                        }
                    );
                });
            }
        });
    }
));

//passport.use('local', new localStrategy({
//    passReqToCallback: true,
//    usernameField: 'username'
//    }, function(req, username, password, done){
//	    pg.connect(connection, function (err, client) {
//	    	console.log('called local - pg');
//	    	var user = {};
//            var query = client.query("SELECT * FROM users WHERE username = $1", [username]);
//
//            query.on('row', function (row) {
//        	    console.log('User obj', row);
//        	    user = row;
//
//            // Hash and compare
//            if(encryptLib.comparePassword(password, user.password)) {
//                // all good!
//                console.log('matched');
//                done(null, user);
//            } else {
//                console.log('nope');
//                done(null, false, {message: 'Incorrect credentials.'});
//            }
//
//            });
//
//        // After all data is returned, close connection and return results
//        query.on('end', function () {
//            client.end();
//        });
//
//        // Handle Errors
//        if (err) {
//            console.log(err);
//        }
//	    });
//    }
//));

module.exports = passport;
