Template.layout.events({
  'click #home_link': function() {
    Router.go('/');
  },
  'click #signup_btn': function() {
    Router.go('register');
  },
  'click #login_btn': function() {
    Router.go('login');
  },
});
