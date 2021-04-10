const postsRepo = require('../../../lib/repository/postsrepository'),
    util = require('util');


class PostsController {
    //  /api/posts
    constructor(router) {
        router.get('/', this.getPosts.bind(this));
        router.post('/', this.insertPost).bind(this);
    }

    getPosts(req, res) {
        console.log("*** getPosts");
        postsRepo.getPosts((err, data) => {
            if (err) {
                console.log("*** getPosts.err " + util.inspect(err));
                res.json(null);
            }
            else {
                console.log("*** getPosts ok ");
                res.json(data.posts);
            }
        });
    }


    insertPost(req, res) {
        console.log('*** insertPost');
        postsRepo.insertCustomer(req.body, state, (err, post) => {
            if (err) {
                console.log('*** postsRepo.insertPost error: ' + util.inspect(err));
                res.json({ status: false, error: 'Insert failed', post: null });
            } else {
                console.log('*** insertPost ok');
                res.json({ status: true, error: null, post: post });
            }
        });
    }

}

module.exports = PostsController