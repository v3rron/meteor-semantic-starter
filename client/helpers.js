UI.registerHelper('loginServicesConfigured', function() {
  return Accounts.loginServicesConfigured();
});

UI.registerHelper('isLoggedIn', function() {
  return !!Meteor.user();
});

UI.registerHelper('currentRoute', function() {
  return Router.current().route.getName();
})
