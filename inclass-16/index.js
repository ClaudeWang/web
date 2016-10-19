
const express = require('express')
const bodyParser = require('body-parser')

const addArticle = (req, res) => {
     console.log('Payload received', req.body)
     const result = {id: index, author: "newAuthor", text: req.body["body"]}
     articles.push(result)
     index++;    
     res.send({"articles" : result})
}
var articles = [{id: 1, author: "Scott", text: "This is the first ariticle"},
		{id: 2, author: "Claude", text: "This is the second ariticle"},
		{id: 3, author: "Martin", text: "This is the third ariticle"}]
var index = 4;
const hello = (req, res) => res.send({ hello: 'world' })
const getArticle = (req, res) => {
	res.send({"articles": articles})
}
const app = express()
app.use(bodyParser.json())
app.post('/article', addArticle)
app.get('/', hello)
app.get('/articles', getArticle)

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})

