var handler = require('./lib/request-handler');

module.exports = function(app, passport) {

  app.post('/api/users/signup', passport.authenticate('signup', {
      successRedirect: '/'
  }));

  app.post('/api/users/signin', passport.authenticate('signin', {
    successRedirect: '/'
  }));

  app.route('/api/bid')
    .post(handler.postBid)
    .delete(handler.deleteBid);

  app.route('/api/auction')
    .post(handler.postAuction)
    .delete(handler.deleteAuction)
    .put(handler.modifyAuction);
}
