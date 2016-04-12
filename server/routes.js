module.exports = function(app, passport) {

  app.post('/api/users/signup', passport.authenticate('signup', {
      successRedirect: '/'
  }));

  app.post('/api/users/signin', passport.authenticate('signin', {
    successRedirect: '/'
  }));
}
