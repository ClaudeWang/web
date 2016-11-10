'user strict'

const md5 = require('md5')
var hashDB =  {}
var saltMap = {}
var sessionUser = {}
var sid = 0;
var cookieKey = 'sid'

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
			sessionUser[sid] = body.username;
			sid++;
			return;
		} else {
			console.log("wrong password")
			res.sendStatus(401);
			return;
		}
	}
}

module.exports = app => {
	app.post('/register', register)
	app.post('/login', login)
}