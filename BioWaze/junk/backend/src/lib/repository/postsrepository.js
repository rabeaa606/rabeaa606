const mongoose = require('mongoose'),
    Schame = mongoose.Schema,
    Post = require('../../modules/posts/post');


class PostsRepository {

    // get all posts 
    getPosts(callback) {
        console.log("***  PostsRepository.getPosts");
        Post.count((err, postsCount) => {
            var count = postsCount;
            console.log(`** posts  count : ${count}`);

            Post.find({}, (err, posts) => {
                if (err) {
                    console.log(`***  PostsRepository.getPosts err: ${err}`);
                    return callback(err);
                }
                callback(null, {
                    count: count,
                    posts: posts
                });
            });
        });
    }

    // insert a  post
    insertPost(body, state, callback) {
        console.log('*** PostsRepository.insertPost');
        console.log(state);
        let post = new Post();
        console.log(body);

        post.username = body.username;
        post.content = body.content;
        post.date = body.date;
        post.tags = body.tags;
        post.likes = body.likes;
        post.comments = body.comments;
        post.shares = body.shares;


        post.save((err, post) => {
            if (err) {
                console.log(`*** PostsRepository insertPost error: ${err}`);
                return callback(err, null);
            }

            callback(null, post);
        });
    }


}

module.exports = new PostsRepository();