let Strategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;

let { User } = require('../api/data/models');

let fs = require('fs');

let options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: fs.readFileSync('certs/publicKey.pem'),
  algorithms: ['RS256'],
};

let JwtStrategy = new Strategy(options, (payload, done) => {
  if (Date.now() - payload.exp >= 0) return done(null, false);
  else
    User.findById(payload.sub, (error, document) => {
      if (error) {
        return done(error, false);
      }

      if (document) {
        return done(null, document);
      } else {
        return done(null, false);
      }
    });
});

module.exports = JwtStrategy;
