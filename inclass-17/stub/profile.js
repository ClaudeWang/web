
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
}
