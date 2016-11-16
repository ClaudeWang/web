'user strict'

const md5 = require('md5')
var hashDB =  {}
var saltMap = {}
// var sessionUser = {}
var sid = 0;
var cookieKey = 'sid'

var redis = require('redis').createClient("redis://h:p291126q8678ah1kgd0md7op9pu@ec2-50-17-239-57.compute-1.amazonaws.com:10959")


const register = (req, res) => {
	const salt = "" + (Math.floor(Math.random() * 255) + 1);
	const body = req.body;
	saltMap[body.username] = salt;
	hashDB[body.username] = md5(md5(body.password) + salt);
	console.log("Successfully register the user! " + body.username);
	res.send({username: body.username, result: "success"});
}

const login = (req, res) => {
	//generate the hash.
	const body = req.body;
	const salt = saltMap[body.username];
	if (!salt) {
		console.log("The username has not been registered");
		res.sendStatus(401);
		return;
	} else {
		const hashedResult = md5(md5(body.password) + salt);
		if (hashDB[body.username] === hashedResult) {
			console.log("Authentification success");
			res.cookie(cookieKey, sid, {maxAge: 3600 * 1000, httpOnly: true})
			res.send({username: body.username, result: "success"});
			//sessionUser[sid] = body.username;

			redis.hmset(sid, {"username" : body.username, "hashedResult": hashedResult})
			redis.hgetall(sid, function(error, userObj) {
				console.log(sid + ' mapped to ' + userObj)
				sid++;
			})
			return;
		} else {
			console.log("wrong password")
			res.sendStatus(401);
			return;
		}
	}
}

const isLoggedIn = (req, res) => {
	const id = 0;
	redis.hgetall(id, function(error, userObj) {
		if (userObj != undefined) {
			console.log(userObj.username + " already signed in.")
			next();
		} else {
			res.sendStatus(401);
		}
	})
}

module.exports = app => {
	app.post('/register', register)
	app.post('/login', login)
}