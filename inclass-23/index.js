const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cookieParser = require("cookie-parser")

require('./auth')(app)

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})
