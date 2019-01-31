const express = require('express')
const app = express();
const port = 3000
require('dotenv').config();

const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

app.use(cookieParser());

// Use Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Add after body parser initialization!
app.use(expressValidator());

// Set db
require('./data/reddit-db');

const Post = require('./models/post')
const posts = require('./controllers/posts')(app)

require('./controllers/comments.js')(app);
require('./controllers/auth.js')(app);

var exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

module.exports = app;

app.listen(port, () => console.log(`App listening on port ${port}!`))
