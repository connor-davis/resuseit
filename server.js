'use strict';
let dotenv = require('dotenv');
dotenv.config();

let express = require('express');
let next = require('next');

let compression = require('compression');
let cors = require('cors');
let { json, urlencoded } = require('body-parser');
let passport = require('passport');
let mongoose = require('mongoose');

let dev = process.env.NODE_ENV !== 'production';
let app = next({ dev });
let handle = app.getRequestHandler();

let { routes } = require('./api');

app
  .prepare()
  .then(async () => {
    let server = express();

    server.use(compression());
    server.use(json());
    server.use(urlencoded({ extended: false }));
    server.use(passport.initialize());
    server.use(passport.session());

    await mongoose.connect(
      'mongodb://192.168.1.185/reuseit',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      },
      (error) => {
        if (error) return console.log('Error connecting to database.', error);
        else console.log('Connected to database.');
      }
    );

    passport.serializeUser((user, done) => {
      done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
      User.findById(id, function (error, user) {
        done(error, user);
      });
    });

    server.use('/api', routes);

    server.get('*', (request, response) => {
      return handle(request, response);
    });

    server.listen(3000, () => {
      console.log('> Ready on http://localhost:3000');
    });
  })
  .catch((error) => {
    console.error(error.stack);
    process.exit(1);
  });
