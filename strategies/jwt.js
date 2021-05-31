let Strategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;
let fs = require('fs');

let options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: fs.readFileSync('certs/privateKey.pem'),
};

let JwtStrategy = new Strategy(options, (payload, done) => {
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

module.exports = { JwtStrategy };
