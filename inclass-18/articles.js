
const express = require('express')
const bodyParser = require('body-parser')


var articles = 
        [{id: 1, author: "Scott", text: "This is the first ariticle"},
        {id: 2, author: "Claude", text: "This is the second ariticle"},
        {id: 3, author: "Martin", text: "This is the third ariticle"}]
        
const getArticle = (req, res) => {
    if (req.params.id==undefined) res.send(articles)
    else {
        res.send(articles.filter((e) => {
            return (e.id == req.params.id)
        }))
    }
}

const addArticle = (req, res) => {
     console.log('Payload received', req.body)
     const result = {id: articles.length+1, author: "newAuthor", text: req.body["body"]}
     articles.push(result)   
     res.send({"articles" : result})
}

const app = express()
app.use(bodyParser.json())
app.post('/article', addArticle)
app.get('/articles/:id?', getArticle)

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})

