const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports = function(app) {
    // CREATE Comment
    app.post("/posts/:postId/comments", function(req, res) {
        // INSTANTIATE INSTANCE OF MODEL
        const comment = new Comment(req.body);
        console.log(req.user._id)
        comment.author = req.user._id;
        console.log(comment)

        // SAVE INSTANCE OF Comment MODEL TO DB
        comment.save()
        .then(comment => {
            // REDIRECT TO THE ROOT
            return Post.findById(req.params.postId);
        })
        .then(post => {
            post.comments.unshift(comment);
            return post.save();
        })
        .then(post => {
            console.log(post._id)
            res.redirect(`/posts/` + post._id);
        })
        .catch(err => {
            console.log(err);
        });
    });
};
