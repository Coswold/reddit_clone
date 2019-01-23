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

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
