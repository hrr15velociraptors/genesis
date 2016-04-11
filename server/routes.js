module.exports = function(app, passport) {

  app.post('/api/users/signup', passport.authenticate('signup', {
      successRedirect: '/',
      failureRedirect: '/signup'
  }));

  app.post('/api/users/signin', ppassport.authenticate('signin', {
    successRedirect: '/',
    failureRedirect: '/signin'
  });
}
