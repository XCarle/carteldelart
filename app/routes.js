// app/routes.js
module.exports = function(app, passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/connect', function(req, res) {
        res.render('index.html'); // load the index.html file
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {
        // render the page and pass in any flash data if it exists
        res.render('login.html', { message: req.flash('loginMessage') }); 
    });
	
	app.get('/parcours/login', function(req, res) {
        // render the page and pass in any flash data if it exists
        res.render('parcours-login.html', { message: req.flash('loginMessage') }); 
    });

	app.get('/parcours/signup', function(req, res) {
        // render the page and pass in any flash data if it exists
        res.render('parcours-signup.html', { message: req.flash('signupMessage') }); 
    });

	// process the login form
	app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/login', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));
	
	app.post('/parcours-login', passport.authenticate('local-login', {
		successRedirect : '/parcours', // redirect to the secure profile section
		failureRedirect : '/parcours/login', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));
	
		    // process the signup form
    app.post('/parcours-signup', passport.authenticate('local-signup', {
        successRedirect : '/parcours', // redirect to the secure profile section
        failureRedirect : '/parcours/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
    
    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {
        // render the page and pass in any flash data if it exists
        res.render('signup.html', { message: req.flash('signupMessage') });
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
	
    // =============================================================================
	// AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
	// =============================================================================

	// locally --------------------------------
	app.get('/connect/local', function(req, res) {
		res.render('./../views/connect-local.html', { message: req.flash('loginMessage') });
	});
	app.post('/connect/local', passport.authenticate('local-signup', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/connect/local', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// facebook -------------------------------
	// send to facebook to do the authentication
	app.get('/connect/facebook', passport.authorize('facebook', { scope : 'email' }));
	//app.get('/connect/facebook', passport.authenticate('facebook', { scope : 'email' }));

	// handle the callback after facebook has authorized the user
	app.get('/connect/facebook/callback',
		passport.authorize('facebook', {
		//passport.authenticate('facebook', {
			successRedirect : '/parcours',
			failureRedirect : '/parcours/signup'
		}));

	// =============================================================================
	// UNLINK ACCOUNTS =============================================================
	// =============================================================================
	// used to unlink accounts. for social accounts, just remove the token
	// for local account, remove email and password
	// user account will stay active in case they want to reconnect in the future

	// local -----------------------------------
	app.get('/unlink/local', function(req, res) {
		console.log("/unlink/local");
		var user            = req.user;
		user.localemail    = null;
		user.localpassword = null;
		user.save()
			.then(function ()
			{res.redirect('/parcours');})
			.catch(function () 
			{res.redirect('/parcours');});
	});

	// facebook -------------------------------
	app.get('/unlink/facebook', function(req, res) {
		console.log("/unlink/facebook");
		var user            = req.user;
		user.facebooktoken  = null;
		user.save()
			.then(function ()
			{res.redirect('/parcours');})
			.catch(function () 
			{res.redirect('/parcours');});
	});
    
    
    // PARCOURS SECTION
    // HOME
	app.get('/parcours', isVisitorLoggedIn, function (req, res) {
		res.render('./../public/www/artlap.html', {
           user : req.user // get the user out of session and pass to template
       	});
	});
    
     // PARCOURS SECTION
    // HOME
	app.get('/parcours/collection', isVisitorLoggedIn, function (req, res) {
		res.render('./../public/www/parcours/mycollection.html', {
           user : req.user // get the user out of session and pass to template
       	});
	});
	
	app.get('/parcours/expositions', isVisitorLoggedIn, function (req, res) {
		res.render('./../public/www/parcours/myexhibitions.html', {
           user : req.user // get the user out of session and pass to template
       	});
	});
	
	 // PARCOURS SECTION
    // HOME
	app.get('/parcours/profile', isVisitorLoggedIn, function (req, res) {
		res.render('./../public/www/parcours/myprofile.html', {
           user : req.user // get the user out of session and pass to template
       	});
	});
    
	app.get('/directions', isVisitorLoggedIn, function (req, res) {
		res.render('./../public/www/directions.html', {
           user : req.user // get the user out of session and pass to template
       	});
	});    
    
    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
    	if (req.user.dataValues.type =="artiste"){
    		console.log("artiste");
	        res.render('./../public/www/profile.html', {
    	        user : req.user // get the user out of session and pass to template
       		 });
       	} else if (req.user.dataValues.type =="galerie"){
       		console.log("gallery");
       		res.render('./../public/www/places.html', {
    	        user : req.user // get the user out of session and pass to template
       		 });
       	} else if (req.user.dataValues.type =="visitor"){
       		res.redirect('/login');
       	} else {
       		res.render('./../public/www/welcome.html', {
    	        user : req.user // get the user out of session and pass to template
       		 });
       	}
       	
    });
	
	app.get('/creations', isProLoggedIn, function(req, res){
		console.log("CREATIONS - USER : ",req.user);
		if (req.user.dataValues.type == "artiste"){
			res.render('./../public/www/creations.html', {
				user : req.user // get the user out of session and pass to template
			});
        } else if (req.user.dataValues.type == "galerie"){
			res.render('./../public/www/gallery_creations.html', {
				user : req.user // get the user out of session and pass to template
			});        
        }
	});
	
	
	app.get('/parcours/support', isVisitorLoggedIn, function(req, res){
		console.log("SUPPORT : ",req.user);
		res.render('./../public/www/support.html', {
			user : req.user // get the user out of session and pass to template
		});
	});
	
	app.get('/places', isProLoggedIn, function(req, res){
		console.log("PLACES - USER : ",req.user);
        res.render('./../public/www/places.html', {
            user : req.user // get the user out of session and pass to template
        });
	});

	app.get('/expositions', isProLoggedIn, function(req, res){
		console.log("EVENTS - USER : ",req.user);
        res.render('./../public/www/events.html', {
            user : req.user // get the user out of session and pass to template
        });
	});
	
	app.get('/conditions', isVisitorLoggedIn, function(req, res){
		console.log("CONDITIONS - USER : ",req.user);
        res.render('./../public/www/conditions.html', {
            user : req.user // get the user out of session and pass to template
        });
	});
	
    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
    
    // =====================================
    // FORGOT PASSWORD ==============================
    // =====================================    
	// show the forgot form
    app.get('/forgot', function(req, res) {
        // render the page and pass in any flash data if it exists
        res.render('forgot.html', { message: req.flash('loginMessage') }); 
    });
	
	// process the login form
	app.post('/forgot', passport.authenticate('local-forgot', {
		successRedirect : '/connect', // redirect to the secure profile section
		failureRedirect : '/forgot', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));
	
	app.get('/reset/:token', function(req, res) {
        // render the page and pass in any flash data if it exists
        res.render('reset.html', { message: req.flash('loginMessage') }); 
    });
	
	// process the login form
	app.post('/reset/:token', passport.authenticate('local-reset', {
		successRedirect : '/connect', // redirect to the secure profile section
		failureRedirect : '/forgot', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));
	
	

// =====================================
// FACEBOOK ============================
// =====================================	

	// LOGIN ============================
	// =====================================	
	
	// send to facebook to do the authentication
	app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

	// handle the callback after facebook has authenticated the user
	app.get('/auth/facebook/callback',
		passport.authenticate('facebook', {
			successRedirect : '/parcours',
			failureRedirect : '/parcours/signup'
		}));
	
	// AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) ============================
	// ==================================
		// send to facebook to do the authentication
		//app.get('/connect/facebook', passport.authorize('facebook', { scope : 'email' }));
		app.get('/connect/facebook', passport.authenticate('facebook', { scope : 'email' }));

		// handle the callback after facebook has authorized the user
		app.get('/connect/facebook/callback',
			//passport.authorize('facebook', {
			passport.authenticate('facebook', {
				successRedirect : '/parcours',
				failureRedirect : '/parcours/signup'
			}));
	
	
	// UNLINK ============================
	// ==================================
	app.get('/unlink/facebook', function(req, res) {
		var user            = req.user;
		user.facebooktoken = null;
		user.save()
			.then(function ()
			{res.redirect('/parcours');})
			.catch(function () 
			{res.redirect('/parcours');});
	});
    
	
};

function isProLoggedIn(req, res, next) {
	console.log("routes.js - isProLoggedIn");
	// if user is authenticated in the session, carry on 
	if (req.isAuthenticated() && (req.user.dataValues.type=='galerie' || req.user.dataValues.type=='artiste'))
		return next();
	else
		res.redirect('/login');
};

function isLoggedIn(req, res, next) {
	console.log("routes.js - isLoggedIn");
	// if user is authenticated in the session, carry on 
	if (req.isAuthenticated())
		return next();
	else
		res.redirect('/login');
};

// route middleware to make sure a user is logged in
function isVisitorLoggedIn(req, res, next) {
	console.log("routes.js - isVisitorLoggedIn");
	// if user is authenticated in the session, carry on 
	if (req.isAuthenticated())
		return next();
	else
		res.redirect('/parcours/login');
}
