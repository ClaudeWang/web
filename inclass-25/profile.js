const register = require('./auth.js').register
const login = require('./auth.js').login


var cookieParser = require('cookie-parser')


const index = (req, res) => {
     res.send({ hello: 'world' })
}

const getHeadlinesUser = (req, res) => {
	res.send({
		headlines: [{
		username: req.params.user || 'zw21',
		headline: 'This is a headline'
		}]
	});
}

const putHeadline = (req, res) => {
	res.send({
			username: 'zw21',
			headline: req.body.headline || 'I supplied a response.'
		})
}

const getEmailUser = (req, res) => {
	res.send({
		username: req.params.user || 'zw21',
		email: 'zw21@rice.edu'
		});
}

const putEmail = (req, res) => {
	res.send({
		username: 'zw21',
		email: req.body.email || 'zw21@rice.edu'
	})
}

const getZip = (req, res) => {
	res.send({
		username: req.params.user || 'zw21',
		zipcode: '77005'
	});
}

const putZip = (req, res) => {
	res.send({
		username: 'zw21',
		zipcode: req.body.zipcode || '77005'
	})
}


const getAvatar = (req, res) => {
	res.send({
		avatars:[{username: req.params.user || 'zw21',
			avatar: 'http://someAvatar'}]
	});
}

const putAvatar = (req, res) => {
	res.send({
		username: 'zw21',
		avatar: req.body.avatar || 'http://someAvatar'
	})
}

var articles = 
        [{id: 1, author: "Scott", text: "This is the first ariticle"},
        {id: 2, author: "Claude", text: "This is the second ariticle"},
        {id: 3, author: "Martin", text: "This is the third ariticle"}]
    
const getArticle = (req, res) => {
    if (req.params.id==undefined) res.send({"articles": articles})
    else {
        res.send({"articles": articles.filter((e) => {
            return (e.id == req.params.id)
        })})
    }
}

const addArticle = (req, res) => {
     console.log('Payload received', req.body)
     const result = {id: articles.length+1, author: "newAuthor", text: req.body.text}
     articles.push(result)   
     res.send({"articles": [result]})
}

const uploadImage = require('./uploadCloudinary')

const putAvatar = (req, res) => {
	const avatar = req.fileurl;
	res.send({username: profile.username, avatar: req.fileurl})
}

module.exports = app => {
     app.get('/', index)
     app.get('/headlines/:user?', getHeadlinesUser)
     app.put('/headline', putHeadline)
     app.get('/email/:user?', getEmailUser)
     app.put('/email', putEmail)
     app.get('/zipcode/:user?', getZip)
     app.put('/zipcode', putZip)
     app.get('/avatars/:user?', getAvatar)
     app.put('/avatar', putAvatar)
     app.post('/article', addArticle)
	 app.get('/articles/:id?', getArticle)
	 app.post('/register', register)
	 app.put('/avatar', uploadImage('avatar'), putAvatar)
}
