const express = require('express')
const app = express()
const port = 3000

var exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// INDEX
app.get('/', (req, res) => {
  res.render('home')
})

// NEW
app.get('/posts/new', (req, res) => {
    res.render('posts-new')
})

// CREATE
app.post('/posts', (req, res) => {
    Post.create(req.body).then((post) => {
        console.log(post);
        res.redirect(`/post/${review._id}`)
    }).catch((err) => {
        console.log(err.message)
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
