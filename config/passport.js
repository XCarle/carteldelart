// config/passport.js

// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

var configDB = require('./database.js');
var Sequelize = require('sequelize');
var pg = require('pg').native;
var pghstore = require('pg-hstore');
var sequelize = new Sequelize(configDB.url);
var nodemailer = require('nodemailer');

// load up the user model
var User = sequelize.import('../app/models/creator');

User.sync();

// load the auth variables
var configAuth = require('./auth'); // use this one for testing

// expose this function to our app using module.exports
module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id).then(function(user){
			done(null, user);
		}).catch(function(e){
			done(e, false);
		});
    });

	// =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    function(req, email, password, done) {
        console.log("local login");
            var condition = "";
            if (req.url == '/parcours' || req.url == '/parcours-login'){
                console.log("parcours");
                condition = 'visitor';
            } else {
                condition = '';
            }
			User.findOne({ where: { localemail: email, $or: [{type:'artiste'},{type:'galerie'},{type:condition},] }})
				.then(function(user) {
					if (!user) {
						done(null, false, req.flash('loginMessage', 'Unknown user'));
					} else if (!user.validPassword(password)) {
						done(null, false, req.flash('loginMessage', 'Wrong password'));
					} else {
						done(null, user);
					}
				})
				.catch(function(e) { 
					done(null, false, req.flash('loginMessage',e.name + " " + e.message));
				});				
	})); 
    
    // =========================================================================
    // LOCAL FORGOT =============================================================
    // =========================================================================
    passport.use('local-forgot', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    function(req, email, password, done) {
        console.log("exec forgot");
        async.waterfall([
            function(done) {
              crypto.randomBytes(20, function(err, buf) {
                var token = buf.toString('hex');
                done(err, token);
              });
            },
            function(token, done) {
              User.findOne({where: { localemail: req.body.email }})
                .then(function(user){
                    if (!user) {
                      req.flash('error', 'No account with that email address exists.');
                      return res.redirect('/forgot');
                    }
                    user.resetpasswordtoken = token;
                    user.resetpasswordexpires = Date.now() + 3600000; // 1 hour

                    user.save()
                    .catch(function (err) {
						throw err;
					}).then (function() {
						done(null, user);
					});
                })
                .catch(function(e) { 
					done(null, false, req.flash('message','error'));
				});	
            },
            function(user, done) {
              var smtpTransport = nodemailer.createTransport({
                service: 'SendGrid',
                auth: {
                  user: 'carteldelart',
                  pass: '789456123a'
                }
              });
              var mailOptions = {
                to: req.body.email,
                from: 'passwordreset@demo.com',
                subject: 'Carteldelart - Reinitialisation de mot de passe',
                text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                  'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                  'http://localhost:5000/reset/' + user.resetpasswordtoken + '\n\n' +
                  'If you did not request this, please ignore this email and your password will remain unchanged.\n'
              };
              smtpTransport.sendMail(mailOptions, function(err) {
                done(null, false, req.flash('info', 'An e-mail has been sent to ' + req.body.email + ' with further instructions.'));
                if (err) console.log("erreur : ", err);
              });
            }
          ], function(err) {
            if (err) done(null, false, req.flash('message','error'));
          });			
	})); 
    
    // =========================================================================
    // LOCAL RESET =============================================================
    // =========================================================================
    passport.use('local-reset', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    function(req, email, password, done) {
        User.findOne({where: {resetpasswordtoken: req.params.token}})
        .then(function(existingUser) {
            if (!existingUser) {
              done(null, false, req.flash('message','Requête de validation de mot de passe invalide ou expirée.'));
              return res.redirect('/signup');
            }
    
            existingUser.localpassword = User.generateHash(req.body.password);
            existingUser.resetpasswordtoken = null;
            existingUser.resetpasswordexpires = null;
            
            console.log("before saving");
            existingUser.save()
            .success(function(){
                console.log("success");
            })
            .catch(function (err) {
                throw err;
            }).then (function() {
                console.log("PASSWORD CHANGED WAS SAVED");
                console.log("user : ", existingUser.localemail);
                console.log("user resetpasswordtoken : ", existingUser.resetpasswordtoken);
                console.log("user resetpasswordexpires : ", existingUser.resetpasswordexpires);
                var smtpTransport = nodemailer.createTransport({
                    service: 'SendGrid',
                    auth: {
                      user: 'carteldelart',
                      pass: '789456123a'
                    }
                });
                var mailOptions = {
                    to: existingUser.localemail,
                    from: 'passwordreset@demo.com',
                    subject: 'Your password has been changed',
                    text: 'Hello,\n\n' +
                      'This is a confirmation that the password for your account ' + existingUser.localemail + ' has just been changed.\n'
                };
                smtpTransport.sendMail(mailOptions, function(err) {
                    done(null, false, req.flash('success', 'Success! Your password has been changed.'));
                    if (err) console.log("erreur : ", err);
                });
            });
      })
      .catch(function(e) { 
            done(null, false, req.flash('loginMessage',e.name + " " + e.message));
        });	
    }));
    
    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'
	passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    function(req, email, password, done) { 
        
		//  Whether we're signing up or connecting an account, we'll need
		//  to know if the email address is in use.
		User.findOne({ where: { localemail: email }})
			.then(function(existingUser) {
				// check to see if there's already a user with that email
				if (existingUser) 
					return done(null, false, req.flash('loginMessage', 'That email is already taken.'));
				
				console.log("USER DOES NOT EXISTS ON SESSION");
				//  If we're logged in, we're connecting a new local account.
				if(req.user) {
					return;
					console.log("USER DOES EXISTS ON DB");
					var user           = req.user;
					user.localemail    = email;
					user.localpassword = user.generateHash(password);
					// write the type of user here.
					
					
					
					user.save().catch(function (err) {
						throw err;
					}).then (function() {
						console.log("USER WAS SAVED");
						done(null, user);
					});
				} 
				//  We're not logged in, so we're creating a brand new user.
				else {
					console.log("USER DOES NOT EXISTS ON DB");
					// create the user
					if (req.url == '/parcours-signup'){
					    console.log("USER VISITOR");
					    var newUser = User.build({localemail: email, localpassword: User.generateHash(password), type: 'visitor'});	
					} else {
					    console.log("USER PRO");
					    var newUser = User.build({localemail: email, localpassword: User.generateHash(password)});	
					}
					console.log("new User : ", email);
					newUser.save().then(function() {
						done (null, newUser);
					}).catch(function(err) {
						done(null, false, req.flash('loginMessage', err));
					});
				}
			})
			.catch(function (e) {
				console.log("error on User build catched", e);
				done(null, false, req.flash('loginMessage',e.name + " " + e.message));				
			})

    }
        
    ));

    // =========================================================================
    // FACEBOOK ================================================================
    // =========================================================================
    passport.use(new FacebookStrategy({

        clientID        : configAuth.facebookAuth.clientID,
        clientSecret    : configAuth.facebookAuth.clientSecret,
        callbackURL     : configAuth.facebookAuth.callbackURL,
		enableProof: true,
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    function(req, token, refreshToken, profile, done) {
            // check if the user is already logged in
            if (!req.user) {

                User.findOne({ where :{ 'facebookid' : profile.id }})
					.then (function (user) {
						if (user) {

							// if there is a user id already but no token (user was linked at one point and then removed)
							if (!user.facebooktoken) {
								user.facebooktoken = token;
								user.facebookname  = profile.name.givenName + ' ' + profile.name.familyName;
								user.facebookemail = profile.emails[0].value;

								user.save()
									.then( function() {done(null, user);})
									.catch (function(e) {});
                            } else {
								done(null, user);
							}
						} else {
							// if there is no user, create them
							var newUser = User.build ({
								facebookid: profile.id,
								facebooktoken: token,
								facebookname: profile.name.givenName + ' ' + profile.name.familyName,
								facebookemail: profile.emails[0].value,
								type:'visitor'
							});	
							newUser.save()
										.then( function() {done(null, user);})
										.catch (function(e) {});
						}
					});
            } else {
                // user already exists and is logged in, we have to link accounts
                var user            = req.user; // pull the user out of the session

                user.facebookid    = profile.id;
                user.facebooktoken = token;
                user.facebookname  = profile.name.givenName + ' ' + profile.name.familyName;
                user.facebookemail = profile.emails[0].value;

                user.save()
					.then( function() {done(null, user);})
					.catch (function(e) {});
            }
    }));
    
};