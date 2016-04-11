module.exports = function(app, passport) {

  app.post('/api/users/signup', passport.authenticate('signup', {
      successRedirect: '/',
      failureRedirect: '/'
  }));

  app.post('/api/users/signin', passport.authenticate('signin', {
    successRedirect: '/',
    failureRedirect: '/'
  }));
}
