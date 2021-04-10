require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const database = require('./lib/database');
const seeder = require('./lib/dbSeeder');

const app = express();
const port = process.env.PORT || 3000;


class Server {

  constructor() {
    this.initDbSeeder();
    this.start();
  }

  start() {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cors());


    //Routes
    const postRouter = require('./routes/postRouter');
    const userRouter = require('./routes/userRouter');
    const friendshipRouter = require('./routes/friendshipRouter');


    // handels routes
    app.use('/apiposts', postRouter);
    app.use('/apiusers', userRouter);
    app.use('/apifreindship', friendshipRouter);


    app.get('/', (req, res) => {
      res.send('Wllcome to server api');
    });

    app.listen(port, () => {
      console.log(`Running on port : ${port}`);
    });
  }
  initDbSeeder() {
    database.open(() => {
      seeder.init();
    });
  }
}
let server = new Server();