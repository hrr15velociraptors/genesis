var handler = require('./lib/request-handler');

module.exports = function(app, passport) {

  app.post('/api/users/signup', passport.authenticate('signup'), handler.signup);

  app.post('/api/users/signin', passport.authenticate('signin'), handler.signin);

  app.get('/api/users', passport.authenticate('jwt'), handler.getUserInfo);

  app.route('/api/bid')
    .post(passport.authenticate('jwt'), handler.postBid)
    .delete(passport.authenticate('jwt'), handler.deleteBid);

  app.route('/api/auction')
    .get(passport.authenticate('jwt'), handler.getAuction)
    .post(passport.authenticate('jwt'), handler.postAuction)
    .delete(passport.authenticate('jwt'), handler.deleteAuction)
    .put(passport.authenticate('jwt'), handler.modifyAuction);
}
