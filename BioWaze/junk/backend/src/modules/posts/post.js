const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const TagSchema = new Schema({
    tag: { type: String, required: true },
});
const LikeSchema = new Schema({
    username: { type: String, required: true },
});

const CommentSchema = new Schema({
    username: { type: String, required: true },
    content: { type: String, required: true }
});

const ShareSchema = new Schema({
    username: { type: String, required: true },
});

const PostSchame = new Schema({
    username: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: Date, default: Date.now, required: true },
    tags: [TagSchema],
    likes: [LikeSchema],
    comments: [CommentSchema],
    shares: [ShareSchema],

});


module.exports = mongoose.model('Post', PostSchame, 'posts');
