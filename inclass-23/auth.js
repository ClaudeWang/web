'user strict'
const session = require("express-session")
const passport = require("passport")
const GoogleStrategy = require('passport-google-oauth20').Strategy

passport.serializeUser((user, done) => {
	done(null, 1)
})

passport.deserializeUser((id, done) => {
	done(null, "zw21")
})


passport.use(new GoogleStrategy({
    clientID: "557961606264-kf2a6i81bov74eah5qn09hl7vcliod0v.apps.googleusercontent.com",
    clientSecret: "R98FcmWRMaENGVq84h57qGDj",
    callbackURL: "http://localhost:3000/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
	return cb("", "zw21")
  }
));

//functions
function hello(req, res) {
	res.send("Hello there")
}

function logout(req, res) {
	req.logout();
	res.redirect('/');
}

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		next()
	} else {
		res.redirect("/login")
	}
}

function profile(req, res) {
	res.send('Ok here is the profile')
}

function fail(req, res) {
	res.send('Failed')
}

module.exports = app => {
	app.use(session({secret: 'R98FcmWRMaENGVq84h57qGDj'}))
	app.use(passport.initialize())

	app.use('/login', passport.authenticate('google', { scope: ['profile'] }))
	app.use('/callback', passport.authenticate('google', {
		failureRedirect: '/fail' }), function(req, res) {
	    // Successful authentication, redirect home.
	    res.redirect('/profile');
	})
	app.use('/profile', isLoggedIn, profile)
	app.use('/fail', fail)
	app.use('/logout', logout)
	app.use('/', hello)
}