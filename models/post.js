const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  postTitle: { type: String, required: true },
  postBody: { type: String, required: true },
  url: { type: String, required: true },
  subreddit: { type: String, required: true },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
});

module.exports = mongoose.model("Post", PostSchema);
