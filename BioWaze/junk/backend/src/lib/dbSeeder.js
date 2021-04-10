// Module dependencies
const mongoose = require('mongoose'),
    Post = require('../modules/posts/post'),
    dbConfig = require('./configLoader').databaseConfig,
    connectionString = `mongodb://${dbConfig.host}/${dbConfig.database}`,
    connection = null;

class DBSeeder {

    async init() {
        await mongoose.connection.db.listCollections({ name: 'posts' })
            .next((err, collinfo) => {
                if (!collinfo) {
                    console.log('Starting dbSeeder...');
                    this.seed();
                }
            });
    }

    seed() {

        console.log('Seeding data....');

        Post.remove({});
        for (let i = 0; i < 12; i++) {
            var post = new Post({
                'username': "ahed_from server",
                'content': `SERVER ___Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
                'date': new Date("Fri Dec 08 2019 07:44:57"),
                'tags': [
                    { tag: "bootstrap 4.0" },
                    { tag: "laravel" },
                    { tag: "html" },
                    { tag: "css" }
                ],
                'likes': [
                    { username: "user1" },
                    { username: "user2" },
                    { username: "user3" },
                ],
                'comments': [
                    { username: "user111111111111", content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.` },
                    { username: "user2", content: `Lorem Ipsum isdustry. Lorem Ipsum has s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.` },
                ],
                'shares': [
                    { username: "user1" },
                    { username: "user2" },
                    { username: "user3" },
                    { username: "user4" },
                ],
            });




            post.save((err, pos) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('inserted customer: ' + pos.username + ' ' + pos.content);
                }
            });
        }

        console.log('  finiished seed  ');

    }
}

module.exports = new DBSeeder();









