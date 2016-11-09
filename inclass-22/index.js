const express = require('express')
const bodyParser = require('body-parser')
const app = express()


const cors = (req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", req.headers.origin)
	res.setHeader("Access-Control-Allow-Credentials", true)
	res.setHeader('Allow-Origin', req.headers.origin)
	res.setHeader('Credentials', true)
	res.setHeader('Methods', "GET, PUT, DELETE, POST")
	res.setHeader("Headers", "Authorization, Content-Type")
	res.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type")
	if (req.method == "OPTIONS") {
		res.send(200)
	} else {
		next()
	}
}

app.use(cors)
app.use(bodyParser.json())

require('./src/auth')(app)
require('./src/profile')(app)

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 4000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})
