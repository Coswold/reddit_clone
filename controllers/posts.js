const Post = require('../models/post')

module.exports = function(app) {
    // INDEX
    app.get('/', (req, res) => {
        var currentUser = req.user;

        Post.find({})
        .then(posts => {
            res.render("posts-index", { posts, currentUser });
        })
        .catch(err => {
            console.log(err.message);
        });
    })

    // NEW
    app.get('/posts/new', (req, res) => {
        var currentUser = req.user;

        res.render('posts-new', { currentUser });
    })

    // CREATE
    app.post('/posts', (req, res) => {
        // INSTANTIATE INSTANCE OF POST MODEL
        if (req.user) {
            const post = new Post(req.body);
            console.log(post)
            // SAVE INSTANCE OF POST MODEL TO DB
            post.save((err, post) => {
                // REDIRECT TO THE ROOT
                return res.redirect(`/`);
            })
        } else {
            return res.status(401); // UNAUTHORIZED
        }
    });

    // SHOW
    app.get("/posts/:id", function(req, res) {
        var currentUser = req.user;

        // LOOK UP THE POST
        Post.findById(req.params.id).populate('comments').then((post) => {
            res.render('posts-show', { post, currentUser })
        }).catch((err) => {
            console.log(err.message)
        })
        .catch(err => {
            console.log(err.message);
        });
    });

    // SUBREDDIT
    app.get("/n/:subreddit", function(req, res) {
        Post.find({ subreddit: req.params.subreddit })
        .then(posts => {
            res.render("posts-index", { posts });
        })
        .catch(err => {
            console.log(err);
        });
    });
}
